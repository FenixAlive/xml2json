var express = require("express");
var app = express();
var fs = require ("fs");
var util = require ('util');
var xml2js = require ('xml2js');
var parser = new xml2js.Parser();
//var file = "../xml/2.xml"

function leerXml(file){
try{
  fs.readFile(file, function(err, data){
    if(err){console.log(err,"No se pudo leer el archivo")};
    
    parser.parseString(data,function(err, result){
     if(err){console.log(err,"hay un error en el Json parser")}
//     console.log(result)
     var res=JSON.stringify(result);
     json = JSON.parse(res);
//      console.log(util.inspect(json,false,null));

//encabezado Comprobante
          
    try{
    var fechaExp = json['cfdi:Comprobante']['$']['fecha'];
    }catch(err){
    console.log(err);
    fechaExp=0;
    }
    try{
    var moneda = json['cfdi:Comprobante']['$']['Moneda'];
    }catch(err){
    console.log(err);
    moneda=0;
    }
    try{
    var tipo = json['cfdi:Comprobante']['$']['tipoDeComprobante'];
    }catch(err){
    console.log(err);
    tipo=0;
    }
    try{
    var metodo = json['cfdi:Comprobante']['$']['metodoDePago']
    }catch(err){
    console.log(err);
    metodo=0;
    }
    try{
    var subtotal = json['cfdi:Comprobante']['$']['subTotal'];
    }catch(err){
    console.log(err);
    subtotal=0;
    }
    try{
    var total = json['cfdi:Comprobante']['$']['total']; 
    }catch(err){
    console.log(err);
    total=0;
    }
    try{
    var folio = json['cfdi:Comprobante']['$']['folio'];
    }catch(err){
    console.log(err);
    folio=0;
    }
//   console.log(fechaExp,moneda,tipo,metodo,subtotal,total,folio);

//emisor

    try{
    var emisor=json['cfdi:Comprobante']['cfdi:Emisor'][0]['$'];
    }catch(err){
    console.log(err);
    emisor=0;
    }
    try{
    var rfcEmisor = emisor["rfc"];
    }catch(err){
    console.log(err);
    rfcEmisor=0;
    }
    try{
    var nombreEmisor = emisor['nombre'];
    }catch(err){
    console.log(err);
    nombreEmisor=0;
    }
    try{
    var municipioEmisor = json['cfdi:Comprobante']['cfdi:Emisor'][0]['cfdi:DomicilioFiscal'][0]['$']['codigoPostal'];
    }catch(err){
    console.log(err);
    municipioEmisor=0;
    }
//    console.log(rfcEmisor,nombreEmisor,municipioEmisor)

//receptor

    try{
    var receptor=json['cfdi:Comprobante']['cfdi:Receptor'][0]['$'];
    }catch(err){
    console.log(err);
    receptor=0;
    }
    try{
    var rfcReceptor=receptor['rfc'];
    }catch(err){
    console.log(err);
    rfcReceptor=0;
    }
//    console.log(rfcReceptor)
    
//conceptos
    
    try{
    var conceptos=json['cfdi:Comprobante']['cfdi:Conceptos'][0]['cfdi:Concepto'];
    }catch(err){
    console.log(err);
    conceptos=0;
    }
    try{
    var cons=[];
      for(i=0;i<conceptos.length;i++){
      cons.push(conceptos[i]['$']);
    }
    }catch(err){
    console.log(err);
    cons=0;
    }
//    console.log(cons);
//impuestos

      try{
    var impuestos=json['cfdi:Comprobante']['cfdi:Impuestos'][0]['cfdi:Traslados'][0]['cfdi:Traslado'];
    var imp=[];
    for(i=0;i<impuestos.length;i++){
    imp.push(impuestos[i]['$']);
    }
//    console.log(imp);
      }catch(err){
      console.log(err)
      var imp=0;
      }

//complemento
    try{
    var complemento=json['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0]['$'];
    }catch(err){
    console.log(err);
    complemento=0;
    }
    try{
    var fechaTimbrado=complemento['FechaTimbrado'];
    }catch(err){
    console.log(err);
    fechaTimbrado=0;
    }
    try{
    var uuid = complemento["UUID"];
    }catch(err){
    console.log(err);
    uuid=0;
    }

//    console.log(fechaTimbrado,uuid);
    
    datos ={
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
        'uuid' :uuid, 
        'pagado': false,
        'proceso': 0
      }
    console.log(datos)
  //aqui termina la funcion
    })
  })
}catch(err){
console.log(err+" no se pudo leer el archivo xml "+file)
}
};
//  leerXml(file);
module.exports.leerXml = leerXml;
