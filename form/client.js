const _0x4912=['display','changedTouches','--vol-value','volume','submit','value','includes','mozRequestFullScreen','onmousedown','Hours\x20:\x20Minutes\x20:\x20Seconds','Vibration\x20on','key','vibrate','split','add','message','body','glitch-btn','ctrlKey','parse','stringify','vol-box','none','test','classList','onkeydown','emit','trunc','getTime','navigator','webkitRequestFullScreen','onmousemove','screenY','length','onclick','Seconds','path','parseInt','getElementById','setProperty','time','ceil','textContent','onmouseup','stop','style','Vibration\x20off','clientHeight','time-left','documentElement','message-text'];(function(_0x2a1e40,_0x5ab318){const _0x49125e=function(_0x4cd42f){while(--_0x4cd42f){_0x2a1e40['push'](_0x2a1e40['shift']());}};_0x49125e(++_0x5ab318);}(_0x4912,0x1ef));const _0x4cd4=function(_0x2a1e40,_0x5ab318){_0x2a1e40=_0x2a1e40-0x17d;let _0x49125e=_0x4912[_0x2a1e40];return _0x49125e;};const _0x4ed798=_0x4cd4,socket=io();let timeSleep=null,intervalId=null,intervalId10=null,countCalls=0x0,flagVibrate=!![];const hintTime=document[_0x4ed798(0x17f)]('hint-time'),timeInput=document[_0x4ed798(0x17f)](_0x4ed798(0x181));timeInput[_0x4ed798(0x1a5)]=_0x2d86fa=>{const _0x13b83f=_0x4ed798;if(!/[0-9]|\:|Backspace|Arrow|Delete/[_0x13b83f(0x1a3)](_0x2d86fa['key'])&&!(_0x2d86fa[_0x13b83f(0x19e)]&&_0x2d86fa[_0x13b83f(0x197)]=='a')||timeInput['value'][_0x13b83f(0x199)](':')[_0x13b83f(0x1ad)]>0x2&&_0x2d86fa['key']===':'){_0x2d86fa['preventDefault']();return;}},timeInput['onkeyup']=_0x236bbb=>{const _0x332f0=_0x4ed798,_0x138fb4=timeInput[_0x332f0(0x191)][_0x332f0(0x199)](':')[_0x332f0(0x1ad)];if(_0x138fb4===0x2)hintTime[_0x332f0(0x183)]='Minutes\x20:\x20Seconds';else _0x138fb4===0x3?hintTime[_0x332f0(0x183)]=_0x332f0(0x195):hintTime[_0x332f0(0x183)]=_0x332f0(0x1af);},socket['on'](_0x4ed798(0x181),_0x2abf64=>{const _0x5090d9=_0x4ed798;timeSleep=_0x2abf64,document[_0x5090d9(0x17f)](_0x5090d9(0x190))[_0x5090d9(0x186)][_0x5090d9(0x18c)]=_0x5090d9(0x1a2),timeInput['style'][_0x5090d9(0x18c)]=_0x5090d9(0x1a2),document[_0x5090d9(0x17f)](_0x5090d9(0x185))[_0x5090d9(0x186)][_0x5090d9(0x18c)]='',intervalId=showTime();}),socket[_0x4ed798(0x1a6)]('time',JSON[_0x4ed798(0x1a0)](null)),document[_0x4ed798(0x17f)](_0x4ed798(0x190))[_0x4ed798(0x1ae)]=_0x24d91e=>{const _0x3793fb=_0x4ed798;if(timeInput['value']['length']===0x0)timeInput[_0x3793fb(0x191)]='0';const _0x557d64=getSeconds(timeInput[_0x3793fb(0x191)]);timeSleep=new Date()['getTime']()+_0x557d64*0x3e8;if(isNaN(timeSleep))return;if(_0x557d64<0xa)countCalls=0xb-_0x557d64;try{flagVibrate&&window[_0x3793fb(0x1a9)][_0x3793fb(0x198)](0x12c);}catch{}document[_0x3793fb(0x17f)](_0x3793fb(0x190))[_0x3793fb(0x186)][_0x3793fb(0x18c)]=_0x3793fb(0x1a2),timeInput[_0x3793fb(0x186)][_0x3793fb(0x18c)]='none';if(timeInput[_0x3793fb(0x191)]==='0')document['getElementById'](_0x3793fb(0x185))[_0x3793fb(0x186)][_0x3793fb(0x18c)]=_0x3793fb(0x1a2);else document['getElementById'](_0x3793fb(0x185))[_0x3793fb(0x186)]['display']='';socket[_0x3793fb(0x1a6)](_0x3793fb(0x181),JSON['stringify']({'timeSleep':timeSleep,'timer':_0x557d64})),intervalId=showTime();},document[_0x4ed798(0x17f)](_0x4ed798(0x185))[_0x4ed798(0x1ae)]=()=>{const _0xfe4f48=_0x4ed798;if(intervalId){try{flagVibrate&&window[_0xfe4f48(0x1a9)][_0xfe4f48(0x198)]([0xc8,0x64,0x64]);}catch{}intervalId10&&(clearInterval(intervalId10),intervalId10=null,countCalls=0x0),document[_0xfe4f48(0x17f)](_0xfe4f48(0x190))[_0xfe4f48(0x186)][_0xfe4f48(0x18c)]='',timeInput['style']['display']='',document[_0xfe4f48(0x17f)]('stop')['style'][_0xfe4f48(0x18c)]='none',clearInterval(intervalId),intervalId=null,document[_0xfe4f48(0x17f)]('time-left')[_0xfe4f48(0x183)]='',socket['emit'](_0xfe4f48(0x185));}};function timeFormat(_0x4f3ae9){const _0x5533fe=_0x4ed798;let _0x4e36c2=Math[_0x5533fe(0x1a7)](_0x4f3ae9/0x3c/0x3c%0x3c),_0x55a123=Math[_0x5533fe(0x1a7)](_0x4f3ae9/0x3c%0x3c),_0xbc9976=_0x4f3ae9%0x3c;return(_0x4e36c2<0xa?'0':'')+_0x4e36c2+':'+((_0x55a123<0xa?'0':'')+_0x55a123)+':'+((_0xbc9976<0xa?'0':'')+_0xbc9976);}function showTime(){return setInterval(()=>{const _0x26ded0=_0x4cd4,_0x53a34d=timeSleep-new Date()[_0x26ded0(0x1a8)]();document[_0x26ded0(0x17f)](_0x26ded0(0x189))['innerHTML']=timeFormat(Math[_0x26ded0(0x1a7)](_0x53a34d/0x3e8));if(!intervalId10&&_0x53a34d/0x3e8<=0xb)intervalId10=setInterval(()=>{const _0x4229de=_0x26ded0;countCalls<0xa?(flagVibrate&&window['navigator'][_0x4229de(0x198)]([0xc8]),countCalls++):(clearInterval(intervalId10),intervalId10=null,countCalls=0x0);},0x3e8);if(timeSleep-new Date()[_0x26ded0(0x1a8)]()<=0x0){try{flagVibrate&&window['navigator'][_0x26ded0(0x198)]([0x12c,0xc8,0x64,0x64,0x64]);}catch{}clearInterval(intervalId),document[_0x26ded0(0x17f)](_0x26ded0(0x189))[_0x26ded0(0x183)]='',document[_0x26ded0(0x17f)](_0x26ded0(0x185))[_0x26ded0(0x186)][_0x26ded0(0x18c)]='none',window['close']();}},0x64);}function showMessage(_0x15eefc){const _0xf2e894=_0x4ed798;try{window[_0xf2e894(0x1a9)][_0xf2e894(0x198)]([0x12c,0xc8,0x64,0x64,0x64]);}catch{}const _0x1292ba=document['getElementById'](_0xf2e894(0x19b)),_0x40ec70=document[_0xf2e894(0x17f)](_0xf2e894(0x18b));if(_0x1292ba[_0xf2e894(0x1a4)]['contains']('off'))_0x1292ba[_0xf2e894(0x1a4)]['remove']('off');_0x40ec70['textContent']=_0x15eefc,setTimeout(()=>{const _0x380965=_0xf2e894;_0x1292ba[_0x380965(0x1a4)][_0x380965(0x19a)]('off');},0x7d0);}let numberOfClicks=0x0;const buttons=document['getElementsByClassName'](_0x4ed798(0x19d));document[_0x4ed798(0x19c)]['ontouchstart']=_0x207043=>{numberOfClicks++,setTimeout(()=>{const _0x129502=_0x4cd4;if(numberOfClicks===0x1){if(!_0x207043['path']['includes'](buttons[0x0])&&!_0x207043[_0x129502(0x17d)][_0x129502(0x192)](buttons[0x1]))mouseDown(_0x207043);}else{if(numberOfClicks===0x2){flagVibrate=!flagVibrate;if(flagVibrate)showMessage(_0x129502(0x196));else showMessage(_0x129502(0x187));}else{if(numberOfClicks>0x2){const _0x13401c=document[_0x129502(0x18a)],_0x29d931=_0x13401c['requestFullScreen']||_0x13401c[_0x129502(0x1aa)]||_0x13401c[_0x129502(0x193)];_0x29d931['call'](_0x13401c);}}}numberOfClicks=0x0;},0x32);};function getSeconds(_0x1a60fb){const _0x26ff06=_0x4ed798,_0x1867b=_0x1a60fb[_0x26ff06(0x199)](':');if(_0x1867b[_0x26ff06(0x1ad)]===0x3)return Number[_0x26ff06(0x17e)](_0x1867b[0x0][_0x26ff06(0x1ad)]?_0x1867b[0x0]:'0')*0xe10+Number[_0x26ff06(0x17e)](_0x1867b[0x1][_0x26ff06(0x1ad)]?_0x1867b[0x1]:'0')*0x3c+Number[_0x26ff06(0x17e)](_0x1867b[0x2]['length']?_0x1867b[0x2]:'0');else return _0x1867b[_0x26ff06(0x1ad)]===0x2?Number['parseInt'](_0x1867b[0x0][_0x26ff06(0x1ad)]?_0x1867b[0x0]:'0')*0x3c+Number[_0x26ff06(0x17e)](_0x1867b[0x1][_0x26ff06(0x1ad)]?_0x1867b[0x1]:'0'):Number['parseInt'](_0x1867b[0x0][_0x26ff06(0x1ad)]?_0x1867b[0x0]:'0');}const volText=document['getElementById']('vol-text');function changeVol(_0x3ceb98){const _0x315a9a=_0x4ed798;document[_0x315a9a(0x18a)][_0x315a9a(0x186)][_0x315a9a(0x180)](_0x315a9a(0x18e),String(_0x3ceb98)+'%'),volText['textContent']=String(_0x3ceb98)+'%';}let currentVol=0x0,shift=0x0;socket['on'](_0x4ed798(0x18f),_0x98cc45=>{const _0x24345c=_0x4ed798;currentVol=JSON[_0x24345c(0x19f)](_0x98cc45),changeVol(currentVol);});const volBox=document[_0x4ed798(0x17f)](_0x4ed798(0x1a1));let flagMouseDown=![],startPos=0x0,flagVisible=![],idTimer=0x0;function mouseDown(_0x51439f){idTimer=setTimeout(()=>{const _0x193760=_0x4cd4;volBox[_0x193760(0x186)][_0x193760(0x18c)]='flex',flagMouseDown=!![],startPos=_0x51439f['screenY']?_0x51439f[_0x193760(0x1ac)]:_0x51439f[_0x193760(0x18d)][0x0][_0x193760(0x1ac)],idTimer=0x0;},0xfa);}function mouseMove(_0x2690b9){const _0x3721fc=_0x4ed798;if(flagMouseDown){shift=Math[_0x3721fc(0x182)](((_0x2690b9[_0x3721fc(0x1ac)]?_0x2690b9[_0x3721fc(0x1ac)]:_0x2690b9[_0x3721fc(0x18d)][0x0][_0x3721fc(0x1ac)])-startPos)/document[_0x3721fc(0x19c)][_0x3721fc(0x188)]*0x64);let _0x942cb3=currentVol-shift<0x0?0x0:currentVol-shift>0x64?0x64:currentVol-shift;changeVol(_0x942cb3);}}function mouseUp(_0x293aed){const _0xba331c=_0x4ed798;if(idTimer!==0x0)clearTimeout(idTimer);flagMouseDown&&(flagMouseDown=![],volBox[_0xba331c(0x186)][_0xba331c(0x18c)]=_0xba331c(0x1a2),currentVol=currentVol-shift<0x0?0x0:currentVol-shift>0x64?0x64:currentVol-shift,socket['emit'](_0xba331c(0x18f),JSON[_0xba331c(0x1a0)](currentVol)));}document[_0x4ed798(0x19c)][_0x4ed798(0x194)]=_0x499fcd=>{mouseDown(_0x499fcd);},document['body'][_0x4ed798(0x1ab)]=_0x19e2fd=>{mouseMove(_0x19e2fd);},document['body'][_0x4ed798(0x184)]=_0x2f7431=>{mouseUp(_0x2f7431);},document[_0x4ed798(0x19c)]['ontouchmove']=_0x3c36c6=>{mouseMove(_0x3c36c6);},document['body']['ontouchend']=_0x213981=>{mouseUp(_0x213981);};