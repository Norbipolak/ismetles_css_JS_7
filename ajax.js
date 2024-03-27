/*
AJAX -> Asynchronous JavaScript and XML

Az AJAX lehetővé teszi az aszinkron HTTP kérések kezelését.

Miért jó ez az aszinkron HTTP kérés
-> 
Ez azért jó, mert létezik olyan is ami szinkron HTTP kérés 
php
->
Beküldünk egy form-ot, újratölti a teljes oldalt és akkor úgy kapja meg a választ 
És az AJAX-nak pont az a lényege, hogy nem tölti be a teljes oldalt, hanem csak intéz egy HTTP kérést 
A válaszban pedig az oldalnak azt a részét, amivel épeen foglalkozunk, azt újratölti!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Tehát lokálisan történik ez az adatmegjelenítés és nem a teljes oldalt rajzoljuk újra meg kérjük le újra 
hanem egy bizonyos részét!!!!

Csinálunk egy fetches dolgot -> dummyjson.com

Get all products
fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);

Itt látunk egy példakódot erről 
Visszakaptunk itt egy object-et a get kéréssel
Object 
    limit: 30
    products: (30)[{...}, {...}, {...}, {...}, {...}, {...}, {...}]
    skip: 0
    total: 100
    [[Prototype]]: Object

Hogyan kaptuk vissza ezt az object-et 
-> 
Itt annyi történt, hogy a fetch egy promise alapú Ajax függvény!!!!!!!!!!!!!!!!!!!!!
Ez egy ilyen beépitett függvény fetch("");
Ami alapéertelmezetten egy paramétert vár kötelezően, ez az URL, tehát az endpoint, amit meg akaruk szólítani!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
fetch("https://dummyjson.com/products");

Az endpointok azok az URL-ek, amelyekről lekérjük az adatokat!!!!!!!!!!!!!!!!!!!!!!!!!!!!
és ez egy promise-t fog visszaadni ez a fetch!!!!!!Promise<Response>
egy Promise response objektumot!!!!
ezért van neki egy then ága 
fetch("https://dummyjson.com/products").then((response)=> {
    console.log(response);
})
Tehát a then ága ad nekünk vissza egy response objektumot 
Megnézzük, hogy a response mit csinál 
console.log(response);
-> 
Response{type: 'cors', url: 'https://dummyjson.com/products', redirected: 'false'....}
    body: (...)
    bodyUsed: false
    headers: Headers {}
    ok: true
    redirected: false
    status: 200
    statusText: ""
    type: "cors"
    url: "https://dummyjson.com/products"
    [[Prototype]]: Response
        body:(...)
        blob: f blob() -> binary large object 
        formData: f formData()
        headers: headers(...)
        json: f json()
        text: f text()
        type: (...)
        url: (...) stb...
        constructor: f Response()

1. body
Van nekünk egy body, a body az az üzenettest HTTP-ben!!!! az adatok amiket lekértünk a szervertől!!
Ennek a fajtái lehetnek 
    - plain text(pl. json, xml, html)
    - binary data(tehát nem szóveges adat -> videó, kép, audio fájl)
    - HTML form adat (ami lehet olyan szerkezetben, hogy kulcs-értékpárok)
    elmagyarazas.js!!!!

Gyakorlatilag az üzenettestben küldjük az adatokat!!!!

2. bodyUsed
Az annyit tesz, hogy felhasználtuk-e már a body-t, illetve hogy lehívtuk már a body-nak az adatait, mert ha egyszer lehívtuk a body
adatait, akkor mégegyszer nem tudjuk ebből az objektumból 

3. headers
A headers az a fejlécállomány 
Headers az két dologra jó 
1. Egyrészt beállításokat tudunk vele közölni a szerver felé, meg a szerver is felénk 
2. Másrészt információkat, adatokat tartalmaz a kliensről vagy a szerverről 
Azok mindenféle olyan adatok, amik nem kapcsolodnak konkrétan azokhoz az adatokhoz, amit küldtünk vagy kapcsolodhatnak is 
akár, mert van olyan, hogy content-type
Tehát ezek az adatok vagy a beállítások -> elmagyarazas.js

Hogyan zajlik a http kérés meg a válasz, hogy müködik a protokol
Hogyan müködhet egy olyan protokol, ahol egy szerver és egy kliens van, kliens megpróbálja megszólítani a szervert 
A szerver meg válaszól valamilyen formában!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Mi kell ahhoz, hogy a kliens megszólitsa a szervert 
Két dolog:
1. az egyik az, hogy megmondja, hogy milyen adatokat akar küldeni (body)
2. megmondja, hogy hogyan akarja küldeni (headers) és mit vár vissza

Léteznek metódusok arra vonatkozóan, hogy hogyan müködjön ez a kérés dolog
És ezek a metódusok!!!!!!!!!
- GET (erőforrás lekérdezése)
- POST (űrlapinformációt küldünk be de úgy, hogy ott kelekezni fog egy új erőforrás)
    pl. felviszünk, regisztrálunk egy új felhasználót, akkor az biztos, hogy POST lesz!!!!!!!!!!!!!!!!!!!!!!!!!!
- PUT (erőforrásnak a teljes felülírása)
    pl. van egy autószerelő üzemünk, felviszünk egy autót, de az összes adatát elírtuk és kicseréjük 
    erre csinálunk egy PUT request-et és felülírjuk, ami az adatbázisban van 
- PATCH (részleges felülírás)
    pl. amikor csak a rendszámot módisítjuk 
- DELETE (letöröljük az erőforrást)
- HEAD (ugyanazt csinálja mint a get, de az üzenettestet nem kapja vissza, csak a fejlécállómányt)

A headers-ben példáúl azt tudjuk megmondani, hogy milyen típusú adatot küldünk!!!!!
mostanában a json API-k, amik elterjedtek, mert könnyű őket használni és egyszerű a beágyazott adatokat küldeni 

4. ok (ok: true)
Ez azt jelenti jelen esetben, hogyha 2XX-es kódot kapunk, valamilyet 200-300-ig (amiben nincsen benne a 300)
akkor az ok: true lesz 
Innen tudjuk, hogy történt-e valami hiba vagy sem!!!!!!!!!!!!!!!!!!!!!!!!!!

5. status
Status pedig effektíve a státuszkód, ami legtöbb esetben ha minden jól ment, akkor az 200

6. type (type: cors)
Az azt jelenti, hogy cross origin kérés, ami annyit tesz, hogy a kliens és a szerver URL címe vagy domain-je eltérő
Tehát más tartományból származnak 

És amig még fontos, hogy látjuk a metódusokat ebben az objektumban 
Itt van pl. a json!!!!!!!!!!!!!!!!!!!
Az vissza fogja nekünk a json-t de van pl. formData, az meg azt adja majd vissza (multipart formData, fájlokat lehet így küldeni)
van itt egy olyan , hogy headers, azzal meg a fejléceket tudjuk kiszedni 

Tudunk küldeni cookie-kat, amik arra jók, hogy valamilyen adatot globálisan tároljunk egy domain-en, hogy mondjuk tudja a szerver 
meg a kliens 

Lényeges, hogy mind a kliens és a szerver is tud küldeni body-t is!!!!!!!!!!!!!!!!!!!!

Státuszkód -> a müvelet, amit szerettünk volna végezni azáltal, hogy HTTP kérést intéztünk, az milyen formában zajlott le 
vagy egyáltalán lezajlott-e 
1XX
Vannak 100-as kódok is, azok az informatív kódok, azt mondja a szerver a kliensnek, hogy valamilyen további teendője van valószinüleg 
vagy éppen azt, hogy nincsen további teendője 
2XX
Az, hogy minden rendben volt 
3XX
Átírányítás
4XX
Kliens oldali hiba
5XX
Szerver hiba 
***************************************************************************
fetch("https://dummyjson.com/products").then((response)=> {
    console.log(response);
})

Mit tudunk csinálni ezzel a response objektummal 
->
Headert meg/vagy a body-t azt valamilyen formában feldolgozzuk 
for(const h of response.headers) {
    console.log(h);
}

fetch("https://dummyjson.com/products").then((response)=> {
    console.log(response);

    for(const h of response.headers) {
    console.log(h);
}
})

Végigmegyünk a headers-ön (console.log(h))
->
['content-type', 'application/json; charset=utf-8']
0: "content-type"
1: "application/json; charset-utf-8"
length: 2
[[Prototype]]: Array(0) (és akkor itt vannak, hogy milyen metódusai vannak ennek az array-nek)
    concat: f concat()
    entries: f entries()
    every: f every()
    filter: f filter()
    findIndex: f findIndex()
    forEach: f forEach()
    join: f join()
    map: f map()
    pop: f pop()
    push: f push()
    reduce: f reduce()
    stb...

Ez gyakorlatilag az entry-ket adja így vissza és akkor itt egyféle header-t kaptunk vissza -> content-type application/json

Hogyan tudjuk visszakapni a body-t, visszatudjuk kapni sima text formában is 
->
console.log(response.text())
de mivel ez egy promise 
-> 
ezért azt kell csinálnunk, hogy 
response.text().then((text)=> {
    console.log(text);
})
És akkor itt plain text-ben, tehát egyszerű szöveges üzenetben visszakapjuk az adatokat!!!!!!!!!!!

fontos, hogyha promise-t kapunk vissza, akkor kell a then!!!!!!!!!!!!!!!!!!!!!!!!!!

De mi van ha mi json-ben szeretnénk visszakapni!!!!!!!!!!!!
response.json();
JSON is visszaad egy promise-t, promise-nak van egy then nevű metódusa
-> 
response.json().then((json)=> {
    console.log(json);
});
És akkor egyből már json-ná is parse-olja nekünk 
console.log(json)
->
{products: Array(30), total: 100, skip: 0, limit: 30}
    limit: 30
    products: (30)[{...}, {...}, {...}, {...}, {...}, {...}, {...}]
    skip: 0
    total: 100
    [[Prototype]]: Object

És akkor egyből már json-ná is parse-olja nekünkm nyilván a text esetében is, hogy json-ná parse-oljunk 
*******************
Hogyan tudjuk ezt jobban csinálni
-> 
létrehozunk egy async, hogy getPruducts és akkor itt azt mondjuk, hogy a response az await fetch.. ahogy szoktuk csinálni
és akkor így visszakapjuk a response objektumot, amit majd json-ná parse-olunk 

async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const json = await response.json();
    console.log(json);
}

getProducts();
és akkor console.log(json)-ra megkaptuk azt mint az elöbb a then-es megoldással 
-> 
{products: Array(30), total: 100, skip: 0, limit: 30}
    limit: 30
    products: (30)[{...}, {...}, {...}, {...}, {...}, {...}, {...}]
    skip: 0
    total: 100
    [[Prototype]]: Object

Ez az asnyc await ez azért müködik, mert van egy aszinkron függvényünk, akkor a promise-oknak a válaszát az await 
kulcsszóval be tudjuk várni!!!!!!!!!!!!!!!!!!

Tehát a function-on belül addig blokkolja a folyamatokat, amig meg nem kapja nekünk a választ!!!
És a fetch és a json is add vissza nekünk egy promise-t 
elmagyarazas.js 
***********************************************
Fontos, hogyha mi ilyen aszinkron dolgokat szeretnénk csinálni, akkor azt érdemes belerakni egy try-catch blokkba 

async function getProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

Ennek az az oka, hogyha bármilyen hiba adódik akkor nem áll le a kód futása, hanem a catch ágban meg fogjuk kapni 
a hibánkat 
Tehát a fetch API kéréseket mindig berakjuk try catch blokkba, hogyha aszinkron függvényben kérjük le!!!!!!!!!!!!!!!!!!!!!!
*****************************************************************************************************************
Hogyan lehet paraméterezni ezt a fetch-es dolgot 
add product, várunk egy product-ot, mint paramétert 
belerakjuk, amit az elöbb csináltunk try-catch blokkot és még kiegészítjük a fetch-et 
Berakunk neki egy második paramétert, ami egy objektum lesz!!!!!
!!!!
Meghatározzuk, hogy a metódus az POST lesz 
data meg JSON.stringify(), tehát csinálunk majd egy stringet abből az objektumból amit majd megadunk 
data:JSON.stringify(product) -> product, ami paraméterként meg van adva, ezt majd kidolgozzuk, csinálunk egy objektumot valami adatokkal
headers: ami szintén egy objektum, ahol a content-type az lesz, hogy application/json

async function getProduct(product) {
    try {
        const response = await fetch("https://dummyjson.com/add, {
            method: "POST",
            data: JSON.stringify(product),
            headers: {"content-type":"application/json"}
        });
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

Itt meg, amikor meghívjuk, kidolgozzuk a productot!!!!!!!!!!!!!!!!!!
addProduct({
    "title": "Iphone100",
    "price": 34235435,
    "description": "This is a very good phone"
});

Erre majd mindig az id:101-t fogjuk kapni, mert ugye az eredeti json-ben 100 product van
Az id majd csak akkor kell, hogyha felülírunk!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
******************************************************************************************************************************
Ez volt egy add, most megnézzünk egy felülírást 

async function updateProduct() {
        try {
        const response = await fetch("https://dummyjson.com/products/10, {
            method: "PUT",
            data: JSON.stringify(product),
            headers: {"content-type":"application/json"}
        });
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

Ez nagyon hasonló, mint az add csak az endpoint-ja az más lesz, nem /add 
hanem products/1 vagy 2 vagy 3, attól függ, hogy mi a terméknek az id-ja 
most csak beírjuk ide kézzel, hogy a 10-es terméket akarjuk updatelni -> products/10

És még a method sem POST lesz, hanem PUT 

meghívásnál pedig megadjuk ugyanazt a mit elöbb csináltunk
->
updateProduct({
    "title": "Iphone100",
    "price": 34235435,
    "description": "This is a very good phone"
});
Valamiért nem akarta átírni, de így néz ki a 10-es id-jű termék 
console.log(json)
->
{id: 10, title: 'HP Pavilion, price:1099, discountPercentage: 6.18, stock: 89....'}
    brand: "HP Pavilion"
    category: "laptops"
    description: "dfknberbin"
    discountPercentage: 6.18
    id: 10
    images: (4) [1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg]
    price: 1099
    rating: 4.43
    stock: 89
    thumbnail: "something.jpeg"
    title: "HP Pavilion"
    [[Prototype]]: Object

Ezeket az adatokat át szokta írni, de most valamiért nem, de nyilván ezeket a saját adatbázisában nem írja át
*******************************************************************************************************
Csinálunk egy törlést -> delete, ami kérni fog egy id-t, hogy melyik terméket akarjuk majd kitörölni 
ez nagyon hasonlít a GET-re!!!!!

async function deleteProduct(id) {
        try {
        const response = await fetch("https://dummyjson.com/products/, + id, {
            method: "DELETE",
        });
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

deleteProduct(10);

Letöröljük a 10-es id-val rendelkezőt 
Fontos itt, hogy a függvény egy id-t vár, függvényben hozzácsatoljuk ezt az URL-hez -> https://dummyjson.com/products/, + id
és meghívásnál meg beírjuk azt az id-t, amit törölni szeretnénk 

és ha most megnézzük a console.log(json)-t
akkor lesz egy olyan, hogy 
deletedOn: "2024.03.25T10:11:35.150Z"
isDeleted: true

Visszaküldi az adatokat meg azt, hogy ez ki lett törölve 
**********************************************************************
async function getProduct(id) {
        try {
        const response = await fetch("https://dummyjson.com/products/, + id, {
            method: "GET",
        });
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

Ugy ezt az URL-t szólítjuk meg -> https://dummyjson.com/products/, + id
az nem ugyanaz az endpoint, mind a delete, mert a metódus az más 
-> 
Itt az egyedi terméknek az adatait fogjuk megkapni (dummyjson get a single product)
Itt is ugy van kialakítva az URL, hogy products/1 -> és ez az 1 ez az ID-nk

leszedjük a 15-ös id-val rendelkező terméket 
->
getProduct(15);
->
{id: 10, title: 'HP Pavilion, price:1099, discountPercentage: 6.18, stock: 89....'}
    brand: "Lord - Al-Rehab"
    category: "fragrances"
    description: "dfknberbin"
    discountPercentage: 10.99
    id: 15
    images: (5) [1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg, 5.jpeg]
    price: 30
    rating: 4.7
    stock: 105
    thumbnail: "something.jpeg"
    title: "Eau de Parfume Spray"
    [[Prototype]]: Object


JSON.stringify 
Egy objektumból csinál egy stringet, ami nagyon hasonló szintaktikájú, mint egy JavaScript objektum 
console.log(JSON.stringify({id:15,title:"ASDF"}));
JSON -> JavaScript Object Notation

JSON-nak az a lényege, hogy JavaScript objektumokat küldözgetünk, mert hogy a JavaScript objektumokban tudunk
beágyazott adatokat csinálni!!!!!!!!!!!!!!4

Csinálunk egy objektumot abban vagy egy data, amiben van egy tömb, abban megint vannak} objektumok, amiben tömb...

const obj = {
    data:[{}, {[]}]
}

Ez a beágyazott adat és nagyon egyszerű ilyen beágyazott adatokat küldeni, abban az esetben 
hogyha ebből csinálunk egy stringet és átdobjuk a szerver felé, és ott pedig valahogyan feldolgozzuk parse-oljuk 
*/