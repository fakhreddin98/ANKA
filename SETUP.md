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
- g&aring; vidare till separata adminvyer f&ouml;r sidredigering, uppdrag och formul&auml;r
- redigera publika sidor blockvis med drag and drop i [admin-pages.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin-pages.html)
- skapa, uppdatera, publicera och ta bort uppdrag i [admin-jobs.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin-jobs.html)
- se inkomna formul&auml;r i [admin-inquiries.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin-inquiries.html)
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

- redigera startsida, tj&auml;nster, partners, uppdrag och kontakt som separata sidor
- l&auml;gga till, ta bort och flytta block med drag and drop per sida
- uppdatera sidtitel, navigationstext och meta-beskrivning per sida
- styra publicering per sida

Det som den inte styr fullt ut &auml;nnu &auml;r fri pixelplacering som i ett fullst&auml;ndigt designverktyg. Drag and drop g&auml;ller i den h&auml;r versionen blockordning och blockinneh&aring;ll per sida.

## 8. Flersidig struktur

Nya publika sidor finns nu som:

- [index.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/index.html)
- [services.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/services.html)
- [partners.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/partners.html)
- [jobs.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/jobs.html)
- [contact.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/contact.html)

Ny sidredigering finns i:

- [admin-pages.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin-pages.html)
- [admin-jobs.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin-jobs.html)
- [admin-inquiries.html](c:/Users/fakhreddinka/OneDrive%20-%20RISE/Desktop/Skripter/webbsida/admin-inquiries.html)

Efter den h&auml;r &auml;ndringen beh&ouml;ver den uppdaterade SQL-filen k&ouml;ras igen i Supabase, eftersom tabellen `site_pages` har lagts till. Efter det beh&ouml;ver sidan deployas om.
