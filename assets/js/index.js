var demo = new Vue({
	el: '#app',
	data: {
		dateBirthText: '',
		horos: [],
		buscandoHoros: true,
		datasCommits: [],
		horosUser: {}
	},
	computed: {
		apiURLHoros() {
			return `https://api.adderou.cl/tyaas/`;
		},
		usuarioVazio() {
			return this.dateBirthText.trim() === '';
		}
	},
	methods: {
		fetchHoros: function () {
			if(/....-..-..$/.test(this.dateBirthText)) {
				var xhr = new XMLHttpRequest();
				var self = this;
				xhr.open('GET', self.apiURLHoros);
				xhr.onload = function () {
					self.horos = JSON.parse(xhr.responseText);

					self.fetchHorosEnd();
				}
				xhr.send()
				this.buscandoHoros = true;
			}
		},
		fetchHorosEnd() {
			var self = this;
			for (var signo of Object.keys(self.horos.horoscopo)) {
				if (verificaIntervalo(self.horos.horoscopo[signo].fechaSigno, self.dateBirthText)) {
					self.horosUser = self.horos.horoscopo[signo];
					break;
				}
			}

			this.buscandoHoros = false;
		}
	}
})

var mesesEN = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function verificaIntervalo(fechaSigno, dateBirthText) {
	var intervalo = fechaSigno.split(' al ');
	intervalo[0] = intervalo[0].trim();
	intervalo[1] = intervalo[1].trim();

	dateBirth = new Date(parseInt(dateBirthText.split('-')[0]), parseInt(dateBirthText.split('-')[1]-1), parseInt(dateBirthText.split('-')[2]));

	dateIntervalo = [];
	dateIntervalo.push(new Date(parseInt(dateBirth.getFullYear()), mesesEN.indexOf(intervalo[0].split(' ')[2]), parseInt(intervalo[0].split(' ')[0])));
	dateIntervalo.push(new Date(parseInt(dateBirth.getFullYear() + (mesesEN.indexOf(intervalo[0].split(' ')[2]) == 11 ? 1 : 0)), mesesEN.indexOf(intervalo[1].split(' ')[2]), parseInt(intervalo[1].split(' ')[0])));

	return (dateIntervalo[0].getTime() <= dateBirth.getTime() && dateBirth.getTime() <= dateIntervalo[1].getTime());
}

function formataData(date) {
	return `${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`;
}

let titleProject = document.getElementById('titleProject');

window.setInterval(() => {
	animacaoNomeProjeto();
}, 5000);

function animacaoNomeProjeto() {
	$(titleProject).fadeOut(2000, function () {
		titleProject.textContent = 'Horusis';
		$(titleProject).fadeIn(2000);
	});
}