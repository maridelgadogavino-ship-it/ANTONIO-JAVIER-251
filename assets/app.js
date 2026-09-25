
const target = new Date(document.body.dataset.target);

function tick(){
  let diff=Math.max(0,target-new Date());
  const days=Math.floor(diff/86400000); diff%=86400000;
  const hours=Math.floor(diff/3600000); diff%=3600000;
  const minutes=Math.floor(diff/60000); diff%=60000;
  const seconds=Math.floor(diff/1000);
  const values={days,hours,minutes,seconds};
  for(const [k,v] of Object.entries(values)){
    const el=document.querySelector(`[data-${k}]`);
    if(el) el.textContent=String(v).padStart(2,"0");
  }
}
tick(); setInterval(tick,1000);

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("show"); });
},{threshold:.14});
document.querySelectorAll(".fade").forEach(el=>io.observe(el));

const form=document.querySelector("#rsvp");
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=document.querySelector("#name").value.trim();
    const answer=document.querySelector('input[name="attendance"]:checked');
    const status=document.querySelector("#status");
    if(!name || !answer){
      status.textContent="Completa tu nombre y selecciona una opción.";
      return;
    }
    const invite=document.body.dataset.invite;
    const phone="34675257907"; // provisional
    let msg;

if (answer.value === "Sí, allí estaré") {
  msg = `Hola, soy ${name}. Confirmo mi asistencia al 25 cumpleaños de Antonio Javier.\nInvitación: ${invite}\nRespuesta: ${answer.value}`;
} else {
  msg = `Hola, soy ${name}. No podré asistir al 25 cumpleaños de Antonio Javier.\nInvitación: ${invite}\nRespuesta: ${answer.value}`;
}
    const url=`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.location.href=url;
    status.textContent="Abriendo WhatsApp…";
  });
}
