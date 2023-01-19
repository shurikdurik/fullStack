import { createApp } from 'vue'

createApp({
    data() {
        return {
            form: {
                name: '',
                value: ''
            }
        }
    },
    methods: {
        createContact() {
            const {...contact} = this.form;
            this.form.name = this.form.value = ' ';
        }
    }
}).mount('#app')