const { createApp } = Vue;

createApp({//Digimons separados por suas devidas classes em um array.
    data() {
        return {
            digimons: [],
            searchText: '',
            loading: true,
            levelOrder: ['fresh', 'in-training', 'rookie', 'champion', 'ultimate', 'mega', 'armor']//Classes
        };
    },
    computed: {//Filtro dos digimons com base no seu texto e os ordena 
        sortedAndFilteredDigimons() {
            return this.digimons
                .filter(digimon =>
                    digimon.name.toLowerCase().includes(this.searchText.toLowerCase())
                )
                .sort((a, b) => {
                    return this.levelOrder.indexOf(a.level.toLowerCase()) - this.levelOrder.indexOf(b.level.toLowerCase());
                });
        }
    },
    methods: {//Buscar os digmons na API
        fetchDigimons() {
            fetch('https://digimon-api.vercel.app/api/digimon')//API
                .then(response => response.json())
                .then(data => {
                    this.digimons = data.map(digimon => {
                        return {
                            ...digimon,
                            showDetails: false
                        };
                    });
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching Digimon data:', error);
                    this.loading = false;
                });
        },
        toggleDetails(digimon) {//Mostrar os detalhes de cada digimon separadamente
            digimon.showDetails = !digimon.showDetails;
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getTypeClass(level) {//Formatação css, substituição de espaços e conversão de maiuculas    
            return level.toLowerCase().replace(/ /g, '-');
        }
    },
    created() {//Buscar os dados dos digimons
        this.fetchDigimons();
    }
}).mount('#app');
