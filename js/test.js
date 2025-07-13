// Testen - lytter til de valgmuligheder der vælges, og tæller sammen, således at den kan bestemme resultatet
document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const answers = new FormData(event.target);
    let score = { A: 0, B: 0, C: 0, D: 0 };
    for (let value of answers.values()) {
        if (value === "none") {
            continue;
        }
        score[value]++;
    }

    // Vælger et restultat alt efter hvilket score der er højst - de forskellige svarmulighederes svar er defineret i html
    let highestScore = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    let resultText;
    switch (highestScore) {
        case 'A':
            resultText = "<p><span style='font-size: 20px;'>Din hudtype er: <strong>Normal hud</strong></p> </span> <br>" +
                "<p><span style='font-size: 18px;'>Du har en balanceret hudtype, hvor hverken fedt eller tørhed er dominerende. Din hud føles glat og sund, med en ensartet tone og minimal sensitivitet. Porerne er små, og du oplever sjældent bumser eller hudirritation. For at bevare denne balance er det vigtigt at fortsætte med en god hudplejerutine, der inkluderer mild rens, fugtgivende cremer og beskyttelse mod solen.</span></p>" +
                "<p><a href='blog.html#blog_post_normal'> Find ud af mere om din hud ved at læse om din hudtype her.</a></p>";
            break;
        case 'B':
            resultText = "<p><span style='font-size: 20px;'>Din hudtype er: <strong>Tør hud</strong></p> </span> <br>" +
                "<p><span style='font-size: 18px;'>Din hud mangler naturlig fugt og kan ofte føles stram, ru eller skællende. Du oplever måske tørre pletter og mindre elasticitet i huden. Tør hud kræver ekstra fugt og næring, så sørg for at bruge rige fugtighedscremer, serum med hyaluronsyre og undgå udtørrende produkter som hårde sæber eller alkoholbaserede tonere. Husk at beskytte din hud med en god solcreme, selv i vintermånederne.</span></p>" +
                "<p><a href='blog.html#blog_post_tør'> Find ud af mere om din hud ved at læse om din hudtype her.</a></p>";
            break;
        case 'C':
            resultText = "<p><span style='font-size: 20px;'>Din hudtype er: <strong>Fedtet hud</strong></p> </span> <br>" +
                "<p><span style='font-size: 18px;'>Din hud producerer mere talg end nødvendigt, hvilket kan give en skinnende overflade og tendens til tilstoppede porer og bumser. Fedtet hud kræver produkter, der regulerer talgproduktionen uden at udtørre huden for meget. Gå efter lette, oliefri fugtighedscremer, og vær omhyggelig med at rense huden for at forhindre tilstopning af porer. Eksfoliering kan hjælpe med at holde huden klar, men vær forsigtig med ikke at overeksfoliere, da det kan forværre problemet.</span></p>" +
                "<p><a href='blog.html#blog_post_fedtet'> Find ud af mere om din hud ved at læse om din hudtype her.</a></p>";
            break;
        case 'D':
            resultText = "<p><span style='font-size: 20px;'>Din hudtype er: <strong>Kombineret hud</strong></p> </span> <br>" +
                "<p><span style='font-size: 18px;'>Du har en kombination af tørhed og fedtethed i forskellige områder af ansigtet. Typisk er din T-zone (pande, næse og hage) mere fedtet, mens dine kinder og yderkanter af ansigtet er mere tørre eller normale. For at pleje kombineret hud kan det være nødvendigt at bruge forskellige produkter til de forskellige områder af ansigtet – en let fugtighedscreme til T-zonen og en rigere creme til de tørre områder. Brug milde renseprodukter og sørg for at balancere fugten uden at tilstoppe porerne.</span></p>" +
                "<p><a href='blog.html#blog_post_kombineret'> Find ud af mere om din hud ved at læse om din hudtype her.</a></p>";
            break;
        default:
            resultText = "<p>Der opstod en fejl. Prøv igen.</p>";
    }
    document.getElementById("result").innerHTML = resultText;
    document.getElementById("result").style.maxWidth = "800px";
    document.getElementById("result").style.margin = "0 auto";
});

// Resultatknap
document.getElementById("resultButton").addEventListener("click", function() {

    // Fjerner billedet på siden, da dette er i vejen for svaret
    const imageLayer = document.querySelector('.image-layer');
    if (imageLayer) {
        imageLayer.style.display = "none";
    }
    
    // Viser resultatet af testen
    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.style.display = "block";
    }
});