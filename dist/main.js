(()=>{"use strict";(function(e){const t=document.querySelector("#timer-hours"),o=document.querySelector("#timer-minutes"),n=document.querySelector("#timer-seconds"),c=()=>{const e=function(){const e=(new Date("18 november 2020").getTime()-(new Date).getTime())/1e3,t=Math.floor(e%60),o=Math.floor(e/60%60);return{timeRemaining:e,hours:Math.floor(e/60/60),minutes:o,seconds:t}}();e.hours<10&&e.hours>=0?t.textContent=`0${e.hours}`:t.textContent=e.hours,e.minutes<10&&e.minutes>=0?o.textContent=`0${e.minutes}`:o.textContent=e.minutes,e.seconds<10&&e.seconds>=0?n.textContent=`0${e.seconds}`:n.textContent=e.seconds,e.timeRemaining<0&&(t.textContent="00",o.textContent="00",n.textContent="00",clearInterval(c))};c(),setInterval(c,1e3)})(),(()=>{const e=document.querySelector('a[href*="#service-block"]'),t=document.getElementById("service-block");e.addEventListener("click",(e=>{e.preventDefault(),t.scrollIntoView({behavior:"smooth",block:"start"})}))})(),(()=>{const e=document.querySelector("menu"),t=()=>{e.classList.toggle("active-menu")};document.addEventListener("click",(o=>{let n=o.target;n.closest(".menu")?t():(n.classList.contains("close-btn")&&t(),n.matches("li a")&&(function(e,t){e.preventDefault();const o=t.getAttribute("href").substr(1);document.getElementById(o).scrollIntoView({behavior:"smooth",block:"start"})}(o,n),t()),n.closest("menu")||e.classList.remove("active-menu"))}))})(),(()=>{const e=document.querySelector(".popup");document.querySelectorAll(".popup-btn").forEach((t=>{t.addEventListener("click",(()=>{e.style.display="block",window.innerWidth>768&&(()=>{const e=document.querySelector(".popup-content");let t=0;const o=()=>{t++;const n=requestAnimationFrame(o);t<30?e.style.top=2*t+"px":cancelAnimationFrame(n)};o()})()}))})),e.addEventListener("click",(t=>{let o=t.target;o.classList.contains("popup-close")?e.style.display="none":(o=o.closest(".popup-content"),o||(e.style.display="none"))}))})(),(()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),o=document.querySelectorAll(".service-tab");e.addEventListener("click",(e=>{let n=e.target;n=n.closest(".service-header-tab"),n&&t.forEach(((e,c)=>{e===n&&(e=>{for(let n=0;n<o.length;n++)e===n?(t[n].classList.add("active"),o[n].classList.remove("d-none")):(t[n].classList.remove("active"),o[n].classList.add("d-none"))})(c)}))}))})(),(()=>{const e=document.querySelector(".portfolio-content"),t=document.querySelectorAll(".portfolio-item"),o=document.querySelector(".portfolio-dots");for(let e=0;e<t.length;e++){let e=document.createElement("li");e.classList.add("dot"),o.append(e)}const n=document.querySelectorAll(".dot");n[0].classList.add("dot-active");let c,r=0;const s=(e,t,o)=>{e[t].classList.remove(o)},l=(e,t,o)=>{e[t].classList.add(o)},a=()=>{s(t,r,"portfolio-item-active"),s(n,r,"dot-active"),r++,r>=t.length&&(r=0),l(t,r,"portfolio-item-active"),l(n,r,"dot-active")},i=(e=2e3)=>{c=setInterval(a,e)};e.addEventListener("click",(e=>{e.preventDefault();let o=e.target;o.matches(".portfolio-btn, .dot")&&(s(t,r,"portfolio-item-active"),s(n,r,"dot-active"),o.matches("#arrow-right")?r++:o.matches("#arrow-left")?r--:o.matches(".dot")&&n.forEach(((e,t)=>{e===o&&(r=t)})),r>=t.length&&(r=0),r<0&&(r=t.length-1),l(t,r,"portfolio-item-active"),l(n,r,"dot-active"))})),e.addEventListener("mouseover",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(c)})),e.addEventListener("mouseout",(e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&i()})),i(3e3)})(),document.querySelectorAll(".command__photo").forEach((e=>{let t=e.src;e.addEventListener("mouseenter",(e=>{e.target.src=e.target.dataset.img})),e.addEventListener("mouseleave",(e=>{e.target.src=t}))})),document.querySelectorAll("input.calc-item").forEach((e=>{e.addEventListener("input",(()=>{e.value=e.value.replace(/\D/g,"")}))})),((e=100)=>{const t=document.querySelector(".calc-block"),o=document.querySelector(".calc-type"),n=document.querySelector(".calc-square"),c=document.querySelector(".calc-count"),r=document.querySelector(".calc-day"),s=document.getElementById("total");t.addEventListener("change",(t=>{let l=t.target;(l.matches("select")||l.matches("input"))&&(()=>{let t=0,l=1,a=1;const i=o.options[o.selectedIndex].value,u=+n.value;c.value>1&&(l+=(c.value-1)/10),r.value&&r.value<5?a*=2:r.value&&r.value<10&&(a*=1.5),i&&u&&(t=Math.floor(e*i*u*l*a)),s.textContent=t})()}))})(100),(()=>{const e=document.querySelectorAll("form"),t=document.createElement("div");t.style.cssText="\n    font-size: 18px;\n    color: #fff",e.forEach((e=>{e.addEventListener("submit",(o=>{o.preventDefault(),e.append(t),t.textContent="Загрузка..";const n=new FormData(e);let c={};n.forEach(((e,t)=>{c[t]=e})),(e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))(c).then((e=>{if(200!==e.status)throw new Error("Status network not 200");t.textContent="Спасибо, мы скоро с Вами свяжемся!"})).catch((e=>{t.textContent="Что-то пошло не так.."})),setTimeout((()=>{e.querySelectorAll("input").forEach((e=>{e.value=""})),t.remove()}),5e3)}))}));const o=e=>{document.getElementById(e).addEventListener("input",(e=>{let t=e.target;t.classList.contains("form-phone")&&(t.value=t.value.replace(/[^+\d]/,"")),t.classList.contains("form-name")&&(t.value=t.value.replace(/[^А-Яа-яЁё\s]/gi,"")),t.classList.contains("mess")&&(t.value=t.value.replace(/[^А-Яа-яЁё\s\.,:;!?-]/gi,""))}))};o("form1"),o("form2"),o("form3")})()})();