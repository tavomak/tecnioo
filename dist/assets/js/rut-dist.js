!function(t){jQuery.fn.Rut=function(r){var i={digito_verificador:null,on_error:function(){},on_success:function(){},validation:!0,format:!0,format_on:"change"};t.extend(i,r);this.each(function(){if(i.format&&jQuery(this).bind(i.format_on,function(){jQuery(this).val(jQuery.Rut.formatear(jQuery(this).val(),null==i.digito_verificador))}),i.validation)if(null==i.digito_verificador)jQuery(this).bind("blur",function(){var r=jQuery(this).val();""==jQuery(this).val()||jQuery.Rut.validar(r)?""!=jQuery(this).val()&&i.on_success():i.on_error()});else{var t=jQuery(this).attr("id");jQuery(i.digito_verificador).bind("blur",function(){var r=jQuery("#"+t).val()+"-"+jQuery(this).val();""==jQuery(this).val()||jQuery.Rut.validar(r)?""!=jQuery(this).val()&&i.on_success():i.on_error()})}})}}(jQuery),jQuery.Rut={formatear:function(r,t){var i=new String(r),u="";if(i=jQuery.Rut.quitarFormato(i),t){var o=i.charAt(i.length-1);i=i.substring(0,i.length-1)}for(;3<i.length;)u="."+i.substr(i.length-3)+u,i=i.substring(0,i.length-3);return""!=(u=i+u)&&t?u+="-"+o:t&&(u+=o),u},quitarFormato:function(r){for(var t=new String(r);-1!=t.indexOf(".");)t=t.replace(".","");for(;-1!=t.indexOf("-");)t=t.replace("-","");return t},digitoValido:function(r){return"0"==r||"1"==r||"2"==r||"3"==r||"4"==r||"5"==r||"6"==r||"7"==r||"8"==r||"9"==r||"k"==r||"K"==r},digitoCorrecto:function(r){return largo=r.length,!(largo<2)&&(rut=2<largo?r.substring(0,largo-1):r.charAt(0),dv=r.charAt(largo-1),jQuery.Rut.digitoValido(dv),null==rut||null==dv?0:(dvr=jQuery.Rut.getDigito(rut),dvr==dv.toLowerCase()))},getDigito:function(r){for(suma=0,mul=2,i=r.length-1;0<=i;i--)suma+=r.charAt(i)*mul,7==mul?mul=2:mul++;return res=suma%11,1==res?"k":0==res?"0":11-res},validar:function(r){if(r=jQuery.Rut.quitarFormato(r),largo=r.length,largo<2)return!1;for(i=0;i<largo;i++)if(!jQuery.Rut.digitoValido(r.charAt(i)))return!1;var t="";for(i=largo-1,j=0;0<=i;i--,j++)t+=r.charAt(i);var u="";for(u+=t.charAt(0),u+="-",cnt=0,i=1,j=2;i<largo;i++,j++)3==cnt?(u+=".",j++,u+=t.charAt(i),cnt=1):(u+=t.charAt(i),cnt++);for(t="",i=u.length-1,j=0;0<=i;i--,j++)t+=u.charAt(i);return!!jQuery.Rut.digitoCorrecto(r)}};