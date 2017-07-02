var express = require("express");

var app = express();

var fs = require ("fs");

var util = require ('util');

var xml2js = require ('xml2js');

var parser = new xml2js.Parser();

var file = "xml/2.xml"

fs.readFile(file, function(err, data){
    if(err){console.log(err,"readfile")};
    
    parser.parseString(data,function(err, result){
     if(err){console.log(err,"parser")}
     //console.log(result)
     var res=JSON.stringify(result);
     json = JSON.parse(res);
     // console.dir(util.inspect(json,false,null));
     // console.log(json)
    //encabezado Comprobante
    
    var fecha = json['cfdi:Comprobante']['$']['fecha'];
    var moneda = json['cfdi:Comprobante']['$']['Moneda'];
    var tipo = json['cfdi:Comprobante']['$']['tipoDeComprobante'];
    var metodo = json['cfdi:Comprobante']['$']['metodoDePago']
    var subtotal = json['cfdi:Comprobante']['$']['subTotal'];
    var total = json['cfdi:Comprobante']['$']['total']; 
    var folio = json['cfdi:Comprobante']['$']['folio'];
    console.log(fecha,moneda,tipo,metodo,subtotal,total,folio);

    //emisor

    var emisor=json['cfdi:Comprobante']['cfdi:Emisor'][0]['$'];
    var rfcEmisor = emisor["rfc"];
    var nombreEmisor = emisor['nombre']
    var municipioEmisor = json['cfdi:Comprobante']['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['codigoPostal'];
    console.log(rfcEmisor,nombreEmisor,municipioEmisor)

    //receptor

    var receptor=json['cfdi:Comprobante']['cfdi:Receptor'][0]['$'];
    var rfcReceptor=receptor['rfc'];
    console.log(rfcReceptor)
    
    //conceptos
    
    var conceptos=json['cfdi:Comprobante']['cfdi:Conceptos'];
    //console.log(util.inspect(conceptos,false,null));
    $cons=0;
      for(i=0;i<conceptos.length;i++){
      $cons++
      $cons=conceptos[i];
    }

    console.log(util.inspect($cons,false,null));



  //aqui termina la funcion
    })});
  

  var xml= {"cfdi:Comprobante":{"$":{"xmlns:cfdi":"http://www.sat.gob.mx/cfd/3",
  "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
  "xsi:schemaLocation":"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd ",
  "Moneda":"MXN",
  "metodoDePago":"01",
  "LugarExpedicion":"Jalisco",
  "version":"3.2",
  "fecha":"2017-01-08T22:00:32",
  "sello":"V1s7l3g+STXpl81qnMLzUA37ugz6/4zEg5Knnqw0gxSa7jgerZlnFmUEIXpB0W7osoidvliPCkwMxL0IoOwig4cpfvkCzCwGv/cWssbaExj37t3xyxNrDMQOF8tIt56ahaRGG3+axceeHgVHntIiFjW7wwQCnkMf+aS8sc3eLfc=",
  "formaDePago":"Pago en una sola exhibición",
  "tipoDeComprobante":"ingreso",
  "noCertificado":"00001000000300027690",
  "certificado":"MIIEhzCCA2+gAwIBAgIUMDAwMDEwMDAwMDAzMDAwMjc2OTAwDQYJKoZIhvcNAQEFBQAwggGKMTgwNgYDVQQDDC9BLkMuIGRlbCBTZXJ2aWNpbyBkZSBBZG1pbmlzdHJhY2nDs24gVHJpYnV0YXJpYTEvMC0GA1UECgwmU2VydmljaW8gZGUgQWRtaW5pc3RyYWNpw7NuIFRyaWJ1dGFyaWExODA2BgNVBAsML0FkbWluaXN0cmFjacOzbiBkZSBTZWd1cmlkYWQgZGUgbGEgSW5mb3JtYWNpw7NuMR8wHQYJKoZIhvcNAQkBFhBhY29kc0BzYXQuZ29iLm14MSYwJAYDVQQJDB1Bdi4gSGlkYWxnbyA3NywgQ29sLiBHdWVycmVybzEOMAwGA1UEEQwFMDYzMDAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBEaXN0cml0byBGZWRlcmFsMRQwEgYDVQQHDAtDdWF1aHTDqW1vYzEVMBMGA1UELRMMU0FUOTcwNzAxTk4zMTUwMwYJKoZIhvcNAQkCDCZSZXNwb25zYWJsZTogQ2xhdWRpYSBDb3ZhcnJ1YmlhcyBPY2hvYTAeFw0xMzA1MDYxNjUwMTRaFw0xNzA1MDYxNjUwMTRaMIHTMSUwIwYDVQQDExxKQVZJRVIgRURVQVJETyBWQUxMRSBSQU1JUkVaMSUwIwYDVQQpExxKQVZJRVIgRURVQVJETyBWQUxMRSBSQU1JUkVaMSUwIwYDVQQKExxKQVZJRVIgRURVQVJETyBWQUxMRSBSQU1JUkVaMRkwFwYDVQQtExBWQVJKODIwMTI0STdBIC8gMTAwLgYDVQQFEydWQVJKODIwMTI0SEpDTE1WMDYgLyBWQVJKODIwMTI0SEpDTE1WMDYxDzANBgNVBAsTBlVOSURBRDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAmhnhSwIQrNItBJ6a15eEHDVYOLeujvI2yXoL2ZTGsKEQCm3RzKzqVWeIypsRe4BNTRXYMGBHvVK2bU5uLlEzoOaGrD2ZA7pOyrlC2NX0BOzHRV/1TBwgRJiMgF1WDQiPUypfwYjVPywh4+V+yyv3z2vRQN55pZlFnHfPj8BMiLUCAwEAAaMdMBswDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCBsAwDQYJKoZIhvcNAQEFBQADggEBABpquWNX2IEZLfVak9Wtg7Eilo+2CjEKYthsvZbTdKFRsA93NtCXzKaegtAE20HkAfDmzZMiRSfic5fYOIDNY52hyD6yP2XYkkaM+TXufYzAGDkO5l3iFINC+XYs7V+Q6Exe0idaYcbQ/Z3L7PbIGGpsdb+GbAuNhrWvH2gFfCEaqObjDfoQ2Dn5npORsb+tnnGq0zPpxxXHBpDsCF3YT3KRq2TOTBNr4FB4WRMjlM9l5MNVn4ZCbc6B0HttWyeXEh0s/TJUS1Y2doQU+APUZZSKtZy8xCg1iox9culm1ecUBH1/QI4sPgyYUXU+SIAOYLofbDukF+hjbbcxHVVsFGw=",
  "subTotal":"500.000000",
  "total":"500.000000",
  "folio":"263"},
  "cfdi:Emisor":[{"$":{"rfc":"VARJ820124I7A",
  "nombre":"JAVIER EDUARDO VALLE RAMIREZ"},
  "cfdi:DomicilioFiscal":[{"$":{"calle":"CALLE VIA LACTEA",
  "noExterior":"3899",
  "colonia":"ARBOLEDAS",
  "localidad":"ZAPOPAN",
  "municipio":"ZAPOPAN",
  "estado":"Jalisco",
  "pais":"MEXICO",
  "codigoPostal":"45070"}}],
  "cfdi:RegimenFiscal":[{"$":{"Regimen":"Persona fisica actividad empresarial"}}]}],
  "cfdi:Receptor":[{"$":{"rfc":"MUFL880927PG4",
  "nombre":"Luis Ángel Muñoz Franco"},
  "cfdi:Domicilio":[{"$":{"calle":"Río Tibet",
  "noExterior":"67",
  "colonia":"Sur",
  "localidad":"Tonalá",
  "municipio":"Tonalá",
  "estado":"Jalisco",
  "pais":"MEXICO",
  "codigoPostal":"45400"}}]}],
  "cfdi:Conceptos":[{"cfdi:Concepto":[{"$":{"cantidad":"1.000000",
  "unidad":"Pza.",
  "descripcion":"servicios medicos",
  "valorUnitario":"500.000000",
  "importe":"500.000000"}}]}],
  "cfdi:Impuestos":[{"$":{"totalImpuestosTrasladados":"0.000000"},
  "cfdi:Traslados":[{"cfdi:Traslado":[{"$":{"impuesto":"IVA",
  "tasa":"0.00",
  "importe":"0.000000"}}]}]}],
  "cfdi:Complemento":[{"tfd:TimbreFiscalDigital":[{"$":{"xmlns:tfd":"http://www.sat.gob.mx/TimbreFiscalDigital",
  "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
  "FechaTimbrado":"2017-01-08T22:01:28",
  "UUID":"4C411559-D620-11E6-85C1-00155D014009",
  "noCertificadoSAT":"00001000000403557578",
  "selloSAT":"HQlXqenXH3wx6qLk8l1A2eymWEvW6SskAFQLZBjR2vkN46Nps16/ZIowD5Ptv4uS3RP9CnU3W6Jd2F2Qljz+epb1cRR26cq9N8FE3pMH0WmQrDF71z/ArFgJJb5uj44K3itsy4iE7YM/ABxBEYUAhZ+d9uB7KqCZenhqq/0lZgjvlYcl1Sx/GIdzjGkjO4VMFUJXsDGtG5lGYS64ITgvxLbLmjN9GkQfCuZ0BV/et7VOwjtsOm0gOmhf2t3Wp8q+T4ggP1iCPrLAovi8bchyTeCZt3oIqHtudi2QO1ShUyEO6I16cUQ+AutqYM9cHcDoeKWVGOLgkkgjG+OPhYIMmg==",
  "selloCFD":"V1s7l3g+STXpl81qnMLzUA37ugz6/4zEg5Knnqw0gxSa7jgerZlnFmUEIXpB0W7osoidvliPCkwMxL0IoOwig4cpfvkCzCwGv/cWssbaExj37t3xyxNrDMQOF8tIt56ahaRGG3+axceeHgVHntIiFjW7wwQCnkMf+aS8sc3eLfc=",
  "version":"1.0",
  "xsi:schemaLocation":"http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd"}}]}]}}


app.set("view engine", "jade");

app.get("/", function(req,res){
 // res.render();
    });
app.listen(8080);
