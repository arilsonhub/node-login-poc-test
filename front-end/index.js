import { parse } from 'cookie'

async function gerarCsrfToken () {
  try {
    await this.axios.get('/sanctum/csrf-cookie', { withCredentials: true })
  } catch (e) {
    console.log('Falha no CSRF Token')
    throw e
  }
}

async function enviarRequisicaoLogin () {
  let dadosRespostaRequisicao = null
  try {
    const cookies = parse(document.cookie)
    if (!cookies['XSRF-TOKEN']) {
      await this.gerarCsrfToken()
    }
    const resposta = await this.axios.post('/manager/login', {
      'email': this.dadosFormulario.usuario,
      'password': this.dadosFormulario.senha
    },
    {
      withCredentials: true
    })
    dadosRespostaRequisicao = resposta.data
    console.log(dadosRespostaRequisicao)
    await this.encaminharParaLite()
  } catch (e) {
    console.log('Falha ao comunicar com o Manager: ' + e.message)
  }
  return dadosRespostaRequisicao
}

async function encaminharParaLite () {
  try {
    const resposta = await this.axios.post('/login', {}, { baseURL: 'http://liteweb.officeadv.com.br:5201', withCredentials: true })
    const dadosRespostaRequisicao = resposta.data
    console.log(dadosRespostaRequisicao)
  } catch (e) {
    console.log('Falha ao comunicar com o Lite: ' + e.message)
  }
}
