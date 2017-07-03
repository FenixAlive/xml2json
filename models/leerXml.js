var express = require("express");
var app = express();
var fs = require ("fs");
var util = require ('util');
var xml2js = require ('xml2js');
var parser = new xml2js.Parser();

function leerXml(file){
return    fs.readFile(file, function(err, data){
    if(err){console.log(err,"readfile")};
    
return  parser.parseString(data,function(err, result){
     if(err){console.log(err,"parser")}
     //console.log(result)
     var res=JSON.stringify(result);
     json = JSON.parse(res);
     // console.dir(util.inspect(json,false,null));

//encabezado Comprobante
    
    var fechaExp = json['cfdi:Comprobante']['$']['fecha'];
    var moneda = json['cfdi:Comprobante']['$']['Moneda'];
    var tipo = json['cfdi:Comprobante']['$']['tipoDeComprobante'];
    var metodo = json['cfdi:Comprobante']['$']['metodoDePago']
    var subtotal = json['cfdi:Comprobante']['$']['subTotal'];
    var total = json['cfdi:Comprobante']['$']['total']; 
    var folio = json['cfdi:Comprobante']['$']['folio'];
//    console.log(fechaExp,moneda,tipo,metodo,subtotal,total,folio);

//emisor

    var emisor=json['cfdi:Comprobante']['cfdi:Emisor'][0]['$'];
    var rfcEmisor = emisor["rfc"];
    var nombreEmisor = emisor['nombre'];
    var municipioEmisor = json['cfdi:Comprobante']['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['codigoPostal'];
//    console.log(rfcEmisor,nombreEmisor,municipioEmisor)

//receptor

    var receptor=json['cfdi:Comprobante']['cfdi:Receptor'][0]['$'];
    var rfcReceptor=receptor['rfc'];
//    console.log(rfcReceptor)
    
//conceptos
    
    var conceptos=json['cfdi:Comprobante']['cfdi:Conceptos'][0]['cfdi:Concepto'];
    var cons=[];
      for(i=0;i<conceptos.length;i++){
      cons.push(conceptos[i]['$']);
    }
//    console.log(cons);
//impuestos

    var impuestos=json['cfdi:Comprobante']['cfdi:Impuestos'][0]['cfdi:Traslados'][0]['cfdi:Traslado'];
    var imp=[];
      for(i=0;i<impuestos.length;i++){
      imp.push(impuestos[i]['$']);
    }
//    console.log(imp);
//complemento
    var complemento=json['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$'];
    var fechaTimbrado=complemento['FechaTimbrado'];
    var uuid = complemento["UUID"];

//    console.log(fechaTimbrado,uuid);
    
    var datos ={
        'fechaExp':fechaExp,
        'moneda'  :moneda, 
        'tipo'    :tipo ,
        'metodo'  :metodo ,
        'subtotal':subtotal ,
        'total'   :total ,
        'folio'   :folio, 
        'rfcEmisor' :rfcEmisor, 
        'nombreEmisor' :nombreEmisor,
        'municipioEmisor' :municipioEmisor, 
        'rfcReceptor' :rfcReceptor,
        'conceptos' :cons,
        'impuestos' :imp,
        'fechaTimbrado' :fechaTimbrado,
        'uuid' :uuid 
    };
    return datos;
  //aqui termina la funcion
    })})
    
};
var file ="./xml/1.xml"
console.log(leerXml(file));

module.exports.leerXml = leerXml;
