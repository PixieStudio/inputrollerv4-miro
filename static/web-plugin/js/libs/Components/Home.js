class Home extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = `
            <div id="home-container" container="home" style="display:none">
                <button class="my-3 btn btn-primary btn-sm btn-block" id="goToPool">Voir le conteneur sur le board</button>
                <button class="my-3 btn btn-primary btn-sm btn-block" id="clearPoolLog">Vider le Log (définitif)</button>
                <h4 class="text-info">Bienvenue !</h4>
                <p>Input Roller est un lanceur de dés en version Beta.</p>
                <p>Il est possible que certaines fonctionnalités ne soient pas encore complètement fonctionnelles.</p>
                <p>Si vous rencontrez un bug ou des difficultés d'utilisation, n'hésitez pas à me faire un retour via Discord.</p>

                <h4 class="text-info mt-2">Rejoignez la Communauté</h4>
                <p>Pour jouer et partager sur le JdR et Miro.</p>
                <a href="https://discord.gg/QpmJmmACKy" target="_blank" class="text-decoration-none"><button
                        class="my-3 btn btn-warning btn-sm btn-block">Serveur Discord : MIRROR</button></a>
                <p>Vous pouvez soutenir les projets : </p>
                <a href="https://www.patreon.com/laflys" target="_blank" class="text-decoration-none"><button
                        class="my-3 btn btn-warning btn-sm btn-block">Patreon</button></a>
                <a href="https://www.paypal.me/laflys" target="_blank" class="text-decoration-none"><button
                        class="my-3 btn btn-warning btn-sm btn-block">Paypal</button></a>
            </div>
        `
    }
}

export default Home
