/*
Promise az aszinkron folyamatokhoz kialakított objektum!!!!!!!!!!!!!!
Tehát ez egy beépített objektum 

2 féle megoldás van az aszinkron folyamat kezelésére 
1. callback function (ami nyilván nem csak az aszinkronításhoz jó, mert az eseménykezelőkhöz is használjuk)
2. promise 

Ezt olyan példával szemléltettük, hogy van ez a progress nevű tag, aminek lesz egy value-ja, ami 0 és lesz egy max-ja ami 100!!!!!!
->
<progress id="progress" value="0" max="100"></progress>

és, akkor lett nekünk a böngészőben egy ilyen progress bar, és mondjuk átállítjuk a value="30"-ra és max="100"
akkor 30%ról fog indulni és 100-ig megy 
És ezzel fogjuk valamilyen adatnak a letöltését szimulálni 

Lementjük a progress id-val rendelkező progress tag-et 
->
const progress = document.querySelector("#progress");

Szimuláljuk úgy ezt az adatletöltést -> setInterval segítségével

let percentage = 0;

const intervalID = setinterval(()=> {
    percentage++;

    progress.value = percentage;

    if(percentage === 100){
        clearInterval(intervalID);
        alert("A letöltés elkészült");
    }
}, 30)

Minden 30 milliszekundimként növekszik a percentage értéke eggyel, amit beállítottunk a progress.value értékeként és egészen 100-ig fog menni,
mint a percentage meg 0ról is indul mindkettő, mondjuk 3 másodperc alatt betölt a progress bar 0-ról 100-ra 
clearInterval-val meg megállítjuk a folyamatot 
és egy alert-vel meg kiírjuk, hogy a letöltés elkészült 

Nem egészen így fog müködni a folyamat -> csinálunk egy downCallBack function-t, ami vár egy cb-t (tehát callback function-t)

const progress = document.querySelector("#progress");
const downloadBtn = document.querySelector("#download-btn");

function downloadCallBack(cb) {
    let percentage = 0;

const intervalID = setinterval(()=> {
    percentage++;

    progress.value = percentage;

    if(percentage === 100){
        clearInterval(intervalID);
        cb({data: "Ez aztán elképesztően fontos!"});
    }
}, 30)
}

Bemásoltunk mindent ebbe a function-be és a végén, pedig meghívjuk a callback functiont 
cb({adat: "Ez aztán elképesztően fontos!"});

csinálunk egy letöltés gombot 
<button id="download-btn"></button>
ezt is a lementjük a querySelectorral (felül lesz lementve a progress alatt)

Csinálunk egy eseménykezelőt és az eseménykezelőben meghívjuk a downloadCallBack-et
-> 
downloadBtn.addEventListener("click", function() {
    downloadCallBack(); -> itt még hiányzik valami 
});

és, ugye van a downloadCallBack-nek egy cb paramétere, ezért csinálunk egy callback function-t meghívásnál, ez lehet egy névtelen function is 
->
downloadBtn.addEventListener("click", function() {
    downloadCallBack((data)=> {
        console.log(data);
    });
});

Az fontos, hogy a data az nem csak ennyi lesz -> data: "Ez aztán elképesztően fontos!"}, hanem a data az az egész amit oda beleraktunk
downloadCallback-nél meg ezt hívhatnánk akár pisti-nel is így 
-> 
downloadBtn.addEventListener("click", function() {
    downloadCallBack((pisti)=> {
        console.log(pisti);
    });
});
az a lényeg, hogy ezt itt meg fogjuk kapni -> {data: "Ez aztán elképesztően fontos!"}

Rákattintunk a download gombra és amikor betölt megkapka azt ami a cb-ben meg van hívva 
->
{data: 'Ez aztán elképesztően fontos'}
    data: "Ez aztán elképesztően fontos"
    [[Prototype]]: Object 

Amikor megnyomjuk ezt a download gombot, akkor érdemes disabled-ni
mert mi van ha megnyomjuk még párszor, amikor lefut 
->
Többféle folyamat fogja ugyanazt a progress bar-t csesztetni, amit mi nem szeretnénk 
Mi azt szeretnénk, ha már egyszer meg van nyomva a gomb, de még a letöltés nem ért a végére, akkor 
downloadBtn.disabled = true; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
és amikor már a végére értünk a dolognak, akkor pedig disabled = false 
->
function downloadCallBack(cb) {
    let percentage = 0;
    downloadBtn.disabled = true;

const intervalID = setinterval(()=> {
    percentage++;

    progress.value = percentage;

    if(percentage === 100){
        clearInterval(intervalID);
        cb({data: "Ez aztán elképesztően fontos!"});
        downloadBtn.disabled = false;
    }
}, 30)
}

És akkor egészen addig nem tudjuk nyomogatni, amig be nem töltötte 
Ez egy nagyon hasznos dolog, és majd figyelni kell, hogy amig nem ment végbe a folyamat, addig ugyanaz az ember ne csesztesse 
mér a szervert, mert az úgy nem lesz jó 

Ezzel szimuláltunk egy aszinkron folyamatot!!!!!!!!!!!!!!!!!!!!!
Itt az történt, hogy valamennyi ideig letöltötte ezeket az adatokat és az adatok feldolgozása csak azután történhet meg, hogy 
az összes adatunk meg van 
**********************************************************************************************************************************
a függvényt kicsit átalakítjuk és nem az lesz a neve, hogy downloadCallback, hanem az, hogy downloadPromise
->
Ebben azt fogjuk mondani, hogy return new Promise();
Promise vár nekünk egy callback funtion-t és ő biztosit nekünk két paramétert a resolve és a reject nevű függvényt 
amit megint csak elnevezhetünk, aminek akarunk!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
->
return new Promise((resolve, reject)=> {

});
És a resolve az arra szolgál, ha minden rendben ment, amit mi döntünk el, hogy minden rendben ment-e vagy sem 
Akkor ezt futatjuk le, ha úgy gomdoljuk, hogy valami hiba történt, akkor pedog a reject-et futtatjuk le 

A resolve visszaad valamilyen adatot a reject meg dob egy hibát, amit majd el lehet kapni!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

return new Promise((resolve, reject)=> {
const intervalID = setinterval(()=> {
    percentage++;

    progress.value = percentage;

    if(percentage === 100){
        clearInterval(intervalID);
        resolve({data: "Ez aztán elképesztően fontos!"});
        downloadBtn.disabled = false;
    }
}, 30)
});

function downloadCallBack(cb) {
    let percentage = 0;
    downloadBtn.disabled = true;

    return new Promise((resolve, reject)=> {
        const intervalID = setinterval(()=> {
            percentage++;

            progress.value = percentage;

            if(percentage === 100){
                clearInterval(intervalID);
                resolve({data: "Ez aztán elképesztően fontos!"});
                downloadBtn.disabled = false;
            }
        }, 30)
    });
}

Most itt a callback function-ba belerakjuk azok a dolgokat, amiket már előtte csináltunk 
Csak itt jelen esetben, nem a cb-t fogjuk meghívni, hanem a resolve-ot!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

És ez a resolve nekünk úgy fog müködni, ha azt mondjuk (meghívjuk a függvényt, amiben benne vannak ezek a dolgok)
downloadPromise()
-> 
És mivel van itt egy visszatérési értékünk, mutatja is ha felé megyünk a meghívásnál, hogy ez egy Promise<any>
visszatérési érték 
Ezért a promise maga rendelkezik egy then elnevezésű metódussal és a then ágban ezt az adotot úgy kapjuk meg, hogy 
a then vár egy callback function-t 
Érdekes dolog, hogy a promise vár egy callback function-t, a promise-nak a then metódusa vár egy callback function-t 
->
downloadPromise.then(()=> {
    console.log(data);
});

És így is ha lefut a setInterval, akkor kírja nekünk, hogy {data: 'Ez aztán elképesztően fontos'}
Ugyanugy megkapjuk az adatokat, csak ebben a formában, hogy then((data)=> {console.log(data);});

De mi van abban az esetben, hogy itt, nem a resolve-ot hanem a reject-et hívjuk meg 
Ugyanaz az egész függvény, csak
->
reject({data: "Ez aztán elképesztően fontos!"});
Ilyenkor ha lemegy a setInterval, akkor kiírja a konzolra, hogy 
->
Uncaught (in promise) > {data: 'Ez aztán elképesztően fontos!'}
Tehát itt jön ki, hogy mi döntjük el, hogy mi legyen a reject és mi legyen a resolve, mert itt dobott egy hibaüzenetet
Kaptuk egy kivételt, amit mi magunk dobtunk, olyan mintha beirtúk volna, hogy throw 
elmagyarazas.js
Itt pedig, azzal tudjuk elkapni, hogy catch!!!!!
downloadPromise().then((data)=> {
    console.log(data);
}).catch((error)=> {
    console.log(error);
})

És hogyha meghívjuk a catch metódust akkor nem dob hibát a rendszer, mert elkaptuk a saját magunk által dobott hibát!!!!!!!!!
->
{data: 'Ez aztán elképesztően fontos!'}

Tehát függvénymeghívásnál, mindig kell egy then és egy catch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Miért fontos az, hogy hibát dobjunk és ne csak odaírjuk, hogy hiba történt
->
Azért, mert akkor gyakorlatilag elkülönítjük egymástól a then ágat, ami a minden rendben ág meg a cathc ágat, ami meg a semmi
sincs rendben ág 
És akkor külön tudjuk kezelni azt az esetet, amikor minden rendben volt meg azt az esetet, amikor valami nagyon nem volt rendben 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Arra kötelezzük saját magunkat, hogy ezt a két részt így elszeparáljuk 

Nem mindig a resolve és a reject-et fogjuk meghívni, hanem egyszer az egyiket másszor a másikat, hogyha mi azt szeretnénk szimulálni 
hogy ez egy http kérés 
Akkor készíthetünk a promise-on kivül egy tömböt (httpStatutes)
->
const httpStatutes = [200, 201, 403, 500];

A new Promise-ban pedig létrehozunk egy index változót, ami azt fogja csinálni, hogy generálunk egy véletlenszerű számot 
ami az httpStatuses-nek egy indexe, tehát generálni kell egy számot ebben az esetben 0-tól 3-ig, mert azok itt a tömb indexei
-> 
const index = Math.floor(Math.random() * httpStatuses.length);!!!!!!!!
és akkor itt megkapjuk a statusCode-ot ami az httpStatuses-nak az indexedik eleme!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
->
const statusCode = httpStatuses[index].toString();
ezt ráadásul még toString-elni fogjuk, méghozzá azért, merthogy csinálunk egy switch-et rá!!!!!!!!!!!!!!!
switch(statusCode[0]) {
    case: "2":
        resolve({data: "Ez aztán elképesztően fontos!"});
        break,
    case: "4":
        reject({error: "Kliens hiba történt!"});
        break,
    case: "5":
        reject({data: "Szerver hiba történt!"});
        break
}

Ha kettes van az elején, akkor azt mondjuk, hogy resolve, másik két esetben pedig reject!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
És akkor nem lesz nekünk egy cb pataméterünk!!!
és így fog kinézni a függvény

function downloadCallBack() {
    let percentage = 0;
    downloadBtn.disabled = true;
    const httpStatutes = [200, 201, 403, 500];

    return new Promise((resolve, reject)=> {
        const intervalID = setinterval(()=> {
            percentage++;

            progress.value = percentage;

            if(percentage === 100){
                clearInterval(intervalID);

                const index = Math.floor(Math.random() * httpStatuses.length);
                const statusCode = httpStatuses[index].toString;
                switch(statusCode[0]) {
                case: "2":
                    resolve({data: "Ez aztán elképesztően fontos!"});
                    break,
                case: "4":
                    reject({error: "Kliens hiba történt!"});
                    break,
                case: "5":
                    reject({error: "Szerver hiba történt!"});
                    break
                }

                resolve({data: "Ez aztán elképesztően fontos!"});
                downloadBtn.disabled = false;
            }
        }, 30)
    });
}

downloadPromise().then((data)=> {
    console.log(data);
}).catch((error)=> {
    console.log(error);
})

És ha most meghívjuk, akkor három lehetséges kimenet lehet, amiket a switch-ben meghatároztunk 
1. {data: 'Ez aztán elképesztően fontos!'}
2. {error: 'Szerver hiba történt!'}
3. {error: 'Kliens hiba történt!'}

Mi a promise
-> 
A JavaScriptben a promise egy objektum, ami egy aszinkron folyamatnak a teljesülését illetve hibáját reprezentálja 
1. Csináljunk egy promise konstruktort -> new Promise
2. Paramétere egy callback function, aminek kettő argumentje van!!!!!!!!!!!!!!!!!!!(resolve, reject)
3. Ezután egy if vagy egy switch-vel eldöntjük, hogy sikeres volt, amit szerettünk volna, vagy nem 
    Ha sikeres volt, akkor meghívjuk a resolve-ot -> resolve({data: "Ez aztán elképesztően fontos!"});
    ha pedig nem volt sikeres, akkor meg a reject-et -> reject({error: "Szerver hiba történt!"});
4. Meghívásnál, csinálunk egy then ágat, amibe, akkor megy bele ha minden rendben volt, tehát resolve
és csinálunk egy catch ágat, amikor meg akkor megy bele ha reject volt és itt kiírjuk a hibaüzenetet

downloadPromise().then((data)=> {
    console.log(data);
}).catch((error)=> {
    console.log(error);
})

Fontos, dolgok, amire figyelni kell 
1. new Promise mindig egy callback function-t vár, két értékkel (resolve, reject)!!!!!!!!!!!!!!!!!!!!!!!!!
2. El kell dönteni, hogy a mi esetünkben reject vagy resolve, ez egy if vagy egy switch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Ugye if-nél, amit szeretnénk az resolve, amit nem az reject
3. Meghívásnál mindig kell egy then és egy catch blokk, ezek is callback function-ök és pl. a reject mindig egy error-t vár 
a resolve meg mindjuk lehet egy data

még egy példa

const myPromise = new Promise((resolve, reject) => {
  // Perform asynchronous operation
  if ( operation succeeds, mi meghatározzuk a feltételt itt ) {
    resolve(result); // Fulfill the promise with a value
  } else {
    reject(error); // Reject the promise with an error
  }
});

meghívás 

myPromise.then((result) => {
  Handle fulfilled result
}).catch((error) => {
  Handle rejected error
});
********************************************************************************************************************************************
Átmegyönk az AJAX-ra, mert ez szükséges ahhoz

Csinálunk egy ajax.html meg js-t


*/