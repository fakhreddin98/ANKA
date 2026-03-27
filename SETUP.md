# ANKA setup

## 1. Skapa Supabase-projekt

1. Skapa ett nytt projekt i Supabase.
2. G&aring; till `SQL Editor`.
3. K&ouml;r inneh&aring;llet i [supabase-schema.sql](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/supabase-schema.sql).
4. Skapa en anv&auml;ndare i `Authentication` med e-post `fakher.abewe@gmail.com`.

## 2. Fyll i config.js

Redigera [config.js](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/config.js) och fyll i:

- `supabaseUrl`
- `supabaseAnonKey`

`formSubmitEndpoint` &auml;r redan satt till `fakher.abewe@gmail.com`.

## 3. Publicera sidan

Publicera hela mappen som en statisk webbplats, till exempel p&aring; Netlify eller Vercel.

## 4. Verifiera formul&auml;rmejl

FormSubmit skickar normalt ett verifieringsmejl f&ouml;rsta g&aring;ngen formul&auml;ret anv&auml;nds.
Bekr&auml;fta den l&auml;nken i inkorgen f&ouml;r `fakher.abewe@gmail.com`.

## 5. Adminportal

Adminportalen finns i [admin.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin.html).

Funktioner i den h&auml;r versionen:

- logga in som administrat&ouml;r
- redigera webbplatsens texter, l&auml;nkar, bilder och sektionssynlighet
- skapa, uppdatera, publicera och ta bort uppdrag
- se inkomna formul&auml;r
- markera formul&auml;r som `Ny`, `Kontaktad` eller `Stangd`
- &ouml;ppna uppladdade bilagor via signerad l&auml;nk

## 6. Begr&auml;nsning just nu

Mejlnotisen skickas via FormSubmit och submissions sparas i Supabase. Det betyder att:

- du f&aring;r mejl direkt
- du ser data i adminportalen
- filen lagras i Supabase Storage

Om du senare vill ta bort beroendet till FormSubmit kan vi ers&auml;tta mejlnotisen med en egen Edge Function.

## 7. Vad adminportalen styr nu

Fr&aring;n adminportalen kan du nu:

- &auml;ndra hero-text, knappar och bilder
- &auml;ndra brandtitel, footertexter och enklare designf&auml;rger
- &auml;ndra partnertexter f&ouml;r AB Dynamics och OXTS
- &auml;ndra erbjudande-korten
- styra texten i uppdragssektionen
- styra texten i kontaktsektionen
- visa eller d&ouml;lja `Partners`, `Uppdrag` och `Kontakt`
- &auml;ndra ordningen mellan `Partners`, `Uppdrag` och `Kontakt`

Det som den inte styr fullt ut &auml;nnu &auml;r fri layoutredigering av CSS och pixelperfekt design. Det g&aring;r att bygga senare, men nuvarande l&ouml;sning &auml;r ett riktigt inneh&aring;lls-CMS, inte en full sidbyggare.
