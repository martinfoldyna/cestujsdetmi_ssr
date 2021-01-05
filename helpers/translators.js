import enums from "../enums";
import { objectToArray } from "./helpers";

export const translateTermValue = (termValue) => {
  switch (termValue) {
    case "registrace_zapisu":
      return "Registrace zápisu";
    case "editace_zapisu":
      return "Editace zápisu";
    case "fotografie_objektu":
      return "Fotografie objektu";
    case "zakladni_popis":
      return "Základní popis";
    case "kontaktni_informace":
      return "Kontaktní informace";
    case "informace_o_pocasi":
      return "Informace o počasí";
    case "doporuceni_pratelum":
      return "Doporučení přátelům";
    case "dostupnost":
      return "Dostupnost";
    case "odkaz_na_vlastni_web":
      return "Odkaz na vlastní webové stránky";
    case "podrobny_popis":
      return "Podrobný popis objektu";
    case "cenik":
      return "Ceník služeb";
    case "poskytovane_slevy":
      return "Poskytované slevy";
    case "aktivni_mapa":
      return "Aktivní mapa";
    case "rucni_indexace_vyhledavace":
      return "Ruční indexace ve vyhledávačích";
    case "razeni_pred_standard":
      return "Řazení zápisu před Standard";
    case "razeni_pred_optimal":
      return "Řazení zápisu před Optimal";
    case "zarazeni_v_tipech":
      return "Zařazení v tipech portálu";
    case "bez_reklam":
      return "Prezentace bez reklam";
    case "last_minute":
      return "Aktuální nabídky / last minute";
    case "rotace_na_hl_strance":
      return "Rotace na hlavní stránce portálu";
    case "vlozeni_na_facebook":
      return "Vložení objektu na facebook";
    case "banerova_reklama":
      return "Bannerová reklama na portále";
    case "razeni_pred_premium":
      return "Řazení zápisu před Premium";
    case "aktualni_nabidky_facebook":
      return "Aktuální nabídky na facebooku";
    case "cileny_mailing":
      return "Cílený mailing na zákazníky";
    case "rocni_aktualita_na_hl_str":
      return " 2x ročně aktualita na hlavní straně";
    default:
      return termValue;
  }
};

export const translateRegion = (region) => {
  switch (region) {
    case "South Moravian":
      return "Jihomoravský";
    case "Central Bohemia":
      return "Středočeský";
    default:
      return region;
  }
};

export const translateEquipment = (equipment) => {
  switch (equipment) {
    case "bazen":
      return "bazén";
    case "brouzdaliste":
      return "brouzdaliště";
    case "cyklo_sedacka":
      return "cyklo sedačka";
    case "detska_lyzarska_skolicka":
      return "dětská lyžařská školička";
    case "detska_sjezdovka":
      return "dětská sjezdovka";
    case "detsky_domecek":
      return "dětský domeček";
    case "detsky_koutek":
      return "dětský koutek";
    case "detsky_lyzarsky_vlek":
      return "dětský lyžařský vlek";
    case "dobove_hry":
      return "dobové hry";
    case "fotbalove_hriste":
      return "fotbalové hřiště";
    case "houpacka":
      return "houpačka";
    case "hriste":
      return "hřiště";
    case "indianske_typi":
      return "indiánské týpí";
    case "klouzacka":
      return "klouzačka";
    case "kocarek":
      return "kočárek";
    case "kolotoc":
      return "kolotoč";
    case "krosna_na_dite":
      return "krosna na dítě";
    case "lanove_atrakce":
      return "lanové atrakce";
    case "lezecka_stena":
      return "lezecká stěna";
    case "lyzarska_skola":
      return "lyžařská škola";
    case "mikrovlnka":
      return "mikrovlná trouba";
    case "vstup_s_kocarkem":
      return "vstup s kočárkem";
    case "odrazedlo":
      return "odrážedlo";
    case "ohniste_grill_krb":
      return "ohniště / grill /krb";
    case "parkoviste":
      return "parkoviště";
    case "piskoviste":
      return "pískoviště";
    case "prebalovaci_pult":
      return "přebalovací pult";
    case "programy_pro_deti":
      return "programy pro děti";
    case "projizdky_na_konich":
      return "projížďky na koních";
    case "prulezka":
      return "průlezka";
    case "pujcovna_kol":
      return "půjčovna kol";
    case "pujcovna_lyzi":
      return "půjčovna lyží";
    case "pujcovna_sportovniho_vybaveni":
      return "půjčovna sportovního vybavení";
    case "venkovni_sporty":
      return "venkovní sporty";
    case "ruske_kuzelky":
      return "ruské kuželky";
    case "skladaci_hrad":
      return "skládací hrad";
    case "ski_servis":
      return "SKI servis";
    case "stolni_tenis":
      return "stolní tenis";
    case "tenisovy_kurt":
      return "tenisový kurt";
    case "trampolina":
      return "trampolína";
    case "travnata_plocha":
      return "travnatá plocha";
    case "volejbalove_hriste":
      return "volejbalové hřiště";
    case "vozik_za_kolo":
      return "vozík za kolo";
    case "zahradni_altan":
      return "zahradní altán";

    case "dvd_pohadky":
      return "DVD / pohádky na DVD";
    case "autodraha":
      return "autodráha";
    case "chuvicky":
      return "chůvičky";
    case "detska_kosmetika":
      return "dětská kosmetika";
    case "detska_postylka":
      return "dětská postýlka";
    case "detska_strava":
      return "dětská strava";
    case "detska_zidlicka":
      return "dětská židlička";
    case "detska_luzkoviny":
      return "dětské lůžkoviny";
    case "detske_menu":
      return "dětské menu";
    case "detska_plenky":
      return "dětské plenky";
    case "detska_sedatko":
      return "dětské sedátko na WC";
    case "detsky_koutek":
      return "dětský_koutek";
    case "detsky_pribor":
      return "dětský příbor";
    case "dilnicky_pro_deti":
      return "dílničky pro děti";
    case "mazlicci_vitani":
      return "domácí mazlíčci vítáni / po dohodě";
    case "dvd":
      return "DVD";
    case "expozice_pro_deti":
      return "expozice pro děti";
    case "fen":
      return "fén";
    case "herna_sal":
      return "herna / sál";
    case "hlidani_deti_zdarma":
      return "hlídání dětí - zdarma";
    case "hlidani_deti_placeny":
      return "hlídání dětí za poplatek";
    case "hygienicke_ubrousky":
      return "hygienické ubrousky";
    case "internet_zdarma":
      return "internet / WiFi - zdarma";
    case "internet_placeny":
      return "internet / WiFi - placený";
    case "bryndacky":
      return "jednorázové bryndáčky";
    case "kuchynka":
      return "kuchyňka";
    case "kulecnik":
      return "kulečník";
    case "kuzelky":
      return "kuželky";

    case "vstup_s_kocarkem":
      return "vstup s kočárkem";
    case "snidane_polopenze_plnapenze":
      return "snídaně / polopenze / plná penze";
    case "nekuracke":
      return "nekuřácké";
    case "nocnik":
      return "nočník";
    case "baby_friendly":
      return "ocenění BABY FRIENDLY CERTIFICATE";
    case "ochrana_schodiste":
      return "ochrana schodiště proti pádu";
    case "ohrivac_lahvi":
      return "ohřívač lahví";
    case "odrazedlo":
      return "odrážedlo";
    case "pohybove_hry":
      return "pohybové hry nebo cvičení s dětmi";
    case "prebalovaci_pult":
      return "přebalovací pult";
    case "porgramy_pro_deti":
      return "programy pro děti";
    case "pujcovna_hracek":
      return "půjčování hraček";
    case "pujcovna_sportovniho_vybaveni":
      return "půjčovna sportovního vybavení";
    case "halove_sporty":
      return "-halové sporty";
    case "radio_CD":
      return "rádio s CD";
    case "restaurace_jidelna":
      return "restaurace / jídelna";
    case "rucniky_luzkoviny":
      return "ručníky / lůžkoviny";
    case "sipky":
      return "šipky";
    case "spolecenska_mistnost":
      return "společenská místnost";
    case "stolni_hry":
      return "stolní hry";
    case "stupatko_pod_umyvadlo":
      return "stupátko pod umyvadlo";
    case "televize":
      return "televize";
    case "vanicka":
      return "vanička";
    case "varna_konvice":
      return "varná konvice";
    case "vytah":
      return "výtah";
    case "zaslepky_do_zasuvek":
      return "záslepky do elektr. zásuvek";

    default:
      return equipment;
  }
};

export const translateColor = (category) => {
  let color = "";

  switch (category) {
    case "01_standard":
      color = "light-blue";
      break;
    case "03_premium":
      color = "red";
      break;
    case "ubytovani":
    case "02_optimal":
      color = "blue";
      break;
    case "aktuality":
      color = "pink";
      break;
    case "vylety":
    case "zabava":
      color = "orange";
      break;
    case "nejctenejsi":
      color = "purple";
      break;
    case "04_premium_gold":
    case "previo":
      color = "green";
      break;
    case "rady_tipy":
      color = "yellow";
      break;
    default:
      color = "white";
  }

  return color;
};

export const translateObjektPlan = (plan) => {
  const item = objectToArray(enums.DRUH_ZAPISU).find(
    (item) => item.key === plan
  );
  return item ? item.value : plan;
};

export const transalteDiacChar = (char) => {
  switch (char) {
    case "á":
      return "a";
    case "č":
      return "c";
    case "ď":
      return "d";
    case "é":
    case "ě":
      return "e";
    case "í":
      return "i";
    case "ň":
      return "n";
    case "ó":
      return "o";
    case "ř":
      return "r";
    case "š":
      return "s";
    case "ť":
      return "t";
    case "ú":
    case "ů":
      return "u";
    case "ý":
      return "y";
    case "ž":
      return "z";
    default:
      return char;
  }
};
