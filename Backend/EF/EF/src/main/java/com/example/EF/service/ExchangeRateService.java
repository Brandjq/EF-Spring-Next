/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.EF.service;

import com.example.EF.model.ExchangeRateRequest;
import com.example.EF.repository.ExchangeRateRepository;
import jakarta.xml.soap.MessageFactory;
import jakarta.xml.soap.SOAPBody;
import jakarta.xml.soap.SOAPConnection;
import jakarta.xml.soap.SOAPConnectionFactory;
import jakarta.xml.soap.SOAPElement;
import jakarta.xml.soap.SOAPEnvelope;
import jakarta.xml.soap.SOAPException;
import jakarta.xml.soap.SOAPMessage;
import jakarta.xml.soap.SOAPPart;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.soap.client.core.SoapActionCallback;
import javax.xml.namespace.QName;
import java.time.LocalDateTime;

@Service
@Slf4j
public class ExchangeRateService {
    
    private final WebServiceTemplate webServiceTemplate;
    private final ExchangeRateRepository repository;
    private final String SOAP_ENDPOINT = "https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx";
    
    public ExchangeRateService(WebServiceTemplate webServiceTemplate, 
                              ExchangeRateRepository repository) {
        this.webServiceTemplate = webServiceTemplate;
        this.repository = repository;
    }
    
    public String getCurrentExchangeRate() {
        try {
            // Crear mensaje SOAP
            MessageFactory messageFactory = MessageFactory.newInstance();
            SOAPMessage soapMessage = messageFactory.createMessage();
            SOAPPart soapPart = soapMessage.getSOAPPart();
            
            // SOAP Envelope
            SOAPEnvelope envelope = soapPart.getEnvelope();
            envelope.addNamespaceDeclaration("web", "http://www.banguat.gob.gt/variables/ws/");
            
            // SOAP Body
            SOAPBody soapBody = envelope.getBody();
            SOAPElement soapBodyElem = soapBody.addChildElement("TipoCambioDiaString", "web");
            
            // Realizar la llamada SOAP
            SOAPMessage response = callSoapService(soapMessage);
            
            // Procesar respuesta
            SOAPBody responseBody = response.getSOAPBody();
            String exchangeRate = responseBody
                .getElementsByTagName("TipoCambioDiaStringResult")
                .item(0)
                .getTextContent();
            
            // Guardar en base de datos
            ExchangeRateRequest request = new ExchangeRateRequest();
            request.setResponse(exchangeRate);
            request.setRequestDate(LocalDateTime.now());
            repository.save(request);
            
            return exchangeRate;
            
        } catch (Exception e) {
            log.error("Error getting exchange rate", e);
            throw new RuntimeException("Error getting exchange rate", e);
        }
    }
    
    private SOAPMessage callSoapService(SOAPMessage soapMessage) throws SOAPException {
        try {
            // Crear la conexión
            SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
            SOAPConnection soapConnection = soapConnectionFactory.createConnection();
            
            // Enviar el mensaje y obtener la respuesta
            SOAPMessage response = soapConnection.call(soapMessage, SOAP_ENDPOINT);
            soapConnection.close();
            
            return response;
            
        } catch (Exception e) {
            log.error("Error calling SOAP service", e);
            throw new SOAPException("Error calling SOAP service: " + e.getMessage());
        }
    }
}