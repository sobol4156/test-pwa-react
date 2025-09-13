import{w as l,q as c,a,p as e,M as d,L as p,S as u,t as h,O as f,i as m}from"./chunk-B7RQU5TL-DkG0e22m.js";const g=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"manifest",href:"/test-pwa-react/manifest.json"}];function j({children:o}){return a.useEffect(()=>{"serviceWorker"in navigator&&(navigator.serviceWorker.controller||navigator.serviceWorker.register("/test-pwa-react/service-worker.js").then(()=>console.log("SW registered")).catch(console.error));let t;const r=s=>{s.preventDefault(),t=s;const n=document.getElementById("install-btn");n&&(n.style.display="block",n.addEventListener("click",async()=>{n.style.display="none",t.prompt();const{outcome:i}=await t.userChoice;console.log(`User response: ${i}`),t=null}))};return window.addEventListener("beforeinstallprompt",r),()=>{window.removeEventListener("beforeinstallprompt",r)}},[]),e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(d,{}),e.jsx(p,{})]}),e.jsxs("body",{children:[o,e.jsx("button",{id:"install-btn",style:{display:"none"},className:`
    fixed
    bottom-6
    left-1/2
    transform -translate-x-1/2
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-semibold
    py-3
    px-6
    rounded-xl
    shadow-lg
    transition
    duration-300
    z-50
  `,children:"Установить приложение PWA"}),e.jsx(u,{}),e.jsx(h,{})]})]})}const w=l(function(){return e.jsx(e.Fragment,{children:e.jsx(a.Suspense,{fallback:e.jsx("div",{children:"Loading..."}),children:e.jsx(f,{})})})}),y=c(function({error:t}){let r="Oops!",s="An unexpected error occurred.",n;return m(t)&&(r=t.status===404?"404":"Error",s=t.status===404?"The requested page could not be found.":t.statusText||s),e.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[e.jsx("h1",{children:r}),e.jsx("p",{children:s}),n]})});export{y as ErrorBoundary,j as Layout,w as default,g as links};
