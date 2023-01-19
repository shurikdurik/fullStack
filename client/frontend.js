import { createApp } from 'vue'

const app = createApp({
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: []
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods: {
        async createContact() {
            const {...contact} = this.form;
            const response = await request('/api/contacts', 'POST', contact)
            console.log(response);
        },
        markContact(id) {
            const contact = this.contacts.find(el => el.id === id);
            contact.marked = true;
        },
        removeContact(id) {
            this.contacts = this.contacts.filter(c => c.id !== id)
        }
    },
    async mounted() {
        this.loading = true;
        this.contacts = await request('/api/contacts');
        this.loading = false;

    }
});

app.mount("#app")

app.component('loader', {
    template: `
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    `
})

async function request(url, method = "GET", data = null) {
    try {
        const headers = {}
        let body
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }
        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.log(e.message);
    }
} 