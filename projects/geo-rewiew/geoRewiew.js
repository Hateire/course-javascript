import InteractiveMap from './interactiveMap.js';

export default class GeoRewiew {
    constructor() {
        this.formTemplate = document.querySelector('#addFormTemplate').innerHTML;
        this.map = new InteractiveMap('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }

    async onInit() {
        const coords = await this.callApi('coords');

        for (const item of coords) {
            for (let i = 0; i < item.total; i++) {
                this.map.createPlacemark(item.coords);
            }
        }

        document.body.addEventListener('click', this.onDocumentClick.bind(this));
    }

    async callApi(method, body = {}) {
        const res = await fetch('/geo-rewiew/${method}', {
            method: 'post',
            body: JSON.stringify(body),
        });
        return await res.json();
    }

    createForm(coords, rewiews) {
        const root = document.createElement('div');
        root.innerHTML = this.formTemplate;
        const rewiewForm = root.querySelector('[data-role=rewiew-form]');
        rewiewForm.dataset.coords = JSON.stringify(coords);

        for (const item of rewiews) {
            const div = document.createElement('div');
            div.classList.add('rewiew-item');
            div.innerHTML = `
            <div>
            <b>${item.name}</b> [${item.place}]
            </div>
            <div>${item.text}</div>
            `;
            rewiewList.appendChild(div);
        }

        return root;
    }

    async onClick(coords) {
        this.map.openBalloon(coords, 'Загрузка...');
        const list = await this.callApi('list', { coords });
        const form = this.createForm(coords, list);
        this.map.setBalloonContent(form.innerHTML);
    }

    async onDocumentClick(e) {
        if (e.target.dataset.role === 'rewiew-add') {
            const rewiewForm = document.querySelector('[data-role=rewiew-form]');
            const coords = JSON.parse(rewiewForm.dataset.coords);
            const data = {
                coords,
                rewiew: {
                    name: document.querySelector('[data-role=rewiew-name]').value,
                    place: document.querySelector('[data-role=rewiew-place]').value,
                    text: document.querySelector('[data-role=rewiew-text]').value,
                },
            };

            try {
                await this.callApi('add', data);
                this.map.createPlacemark(coords);
                this.map.closeBalloon();
            } catch (e) {
                const formError = documen.querySelector('.form-error');
                formError.innerText - e.message;
            }
        }
    }
}