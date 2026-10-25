const USERS={admin:{pw:'Esther@2026',role:'Administrator'},teacher:{pw:'Teach@2026',role:'Teacher'}};
const $=s=>document.querySelector(s);
const me=()=>{try{return JSON.parse(sessionStorage.getItem('se_user'))}catch(e){return null}};
const page=document.body.dataset.page,u=me();
if(document.body.hasAttribute('data-protected')&&!u){location.href='login.html?next='+page}
const links=[['index.html','Home','home'],['about.html','About','about'],['admissions.html','Admissions','admissions'],['news.html','News','news'],['contact.html','Contact','contact'],['students.html','Students','students'],['staff.html','Staff','staff']];
$('header').innerHTML=`<div class="bar"><a class="brand" href="index.html">St. Esther Secondary School<small>Mubende–Kampala Road</small></a><nav>${links.map(l=>`<a href="${l[0]}" class="${page==l[2]?'on':''}">${l[1]}</a>`).join('')}${u?`<a href="#" id="out">Log out (${u.name})</a>`:`<a href="login.html" class="${page=='login'?'on':''}">Log in</a>`}</nav></div>`;
$('footer').innerHTML='<b>St. Esther Secondary School</b> · Mubende–Kampala Road, Uganda · +256 700 000 000 · info@stesther.example<br>© '+new Date().getFullYear()+' All rights reserved · <a href="admissions.html" style="color:#f2b705">Apply</a> · <a href="login.html" style="color:#f2b705">Staff login</a>';
if($('#out'))$('#out').onclick=e=>{e.preventDefault();sessionStorage.removeItem('se_user');location.href='index.html'};
const lf=$('#loginForm');
if(lf)lf.onsubmit=e=>{e.preventDefault();const n=$('#user').value.trim().toLowerCase(),p=$('#pass').value,a=USERS[n];
 if(a&&a.pw===p){sessionStorage.setItem('se_user',JSON.stringify({name:n,role:a.role}));const nx=new URLSearchParams(location.search).get('next');location.href=(nx||'students')+'.html'}
 else $('#err').textContent='Wrong username or password. Check both and try again.'};
const SEED={
 students:[['ES001','Namukasa Grace','Senior 1','F','0772 000 101'],['ES002','Ssekandi Brian','Senior 2','M','0701 000 102'],['ES003','Nakato Ruth','Senior 3','F','0752 000 103'],['ES004','Kato Daniel','Senior 4','M','0782 000 104'],['ES005','Atim Sarah','Senior 5','F','0772 000 105']],
 staff:[['ST01','Mr. Mugisha Peter','Head Teacher','0772 000 201','head@stesther.example'],['ST02','Ms. Nambi Joan','Deputy Head Teacher','0701 000 202','deputy@stesther.example'],['ST03','Mr. Okello James','Mathematics','0752 000 203','okello@stesther.example'],['ST04','Mrs. Nankya Rose','English','0782 000 204','nankya@stesther.example']]};
const COLS={students:['ID','Name','Class','Gender','Guardian phone'],staff:['ID','Name','Role / Subject','Phone','Email']};
if(SEED[page]){
 const key='se_'+page,isAdmin=u&&u.role==='Administrator';
 let rows=JSON.parse(localStorage.getItem(key)||'null')||SEED[page];
 const save=()=>localStorage.setItem(key,JSON.stringify(rows));
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const draw=()=>{const q=$('#q').value.toLowerCase();
  $('#tbl').innerHTML='<thead><tr>'+COLS[page].map(c=>`<th>${c}</th>`).join('')+(isAdmin?'<th>Action</th>':'')+'</tr></thead><tbody>'+
  rows.map((r,i)=>[r,i]).filter(([r])=>r.join(' ').toLowerCase().includes(q)).map(([r,i])=>'<tr>'+r.map(c=>`<td>${esc(c)}</td>`).join('')+(isAdmin?`<td><button class="btn alt sm" data-d="${i}">Delete</button></td>`:'')+'</tr>').join('')+'</tbody>'};
 $('#q').oninput=draw;
 $('#tbl').onclick=e=>{const d=e.target.dataset.d;if(d!==undefined&&confirm('Delete this record?')){rows.splice(+d,1);save();draw()}};
 const f=$('#addForm');
 if(!isAdmin)f.closest('.panel').innerHTML='<p class="note">Only the administrator can add or delete records. You are signed in as '+u.role+' with view-only access.</p>';
 else f.onsubmit=e=>{e.preventDefault();rows.push([...f.querySelectorAll('input,select')].map(i=>i.value.trim()));save();f.reset();draw()};
 draw();
}

const cf=$('#contactForm');
if(cf)cf.onsubmit=e=>{e.preventDefault();cf.reset();$('#sent').style.display='block'};
