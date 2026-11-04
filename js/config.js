/* ==========================================================================
   S & A — CONFIGURAÇÃO CENTRAL
   --------------------------------------------------------------------------
   Este é o único arquivo que você precisa editar para atualizar os dados de
   contato do site. Tudo o que estiver vazio ('') fica oculto ou usa uma
   alternativa segura — nada é inventado.
   ========================================================================== */

window.SITE = {

  /* Nome da empresa (usado em títulos, mensagens e rodapé) */
  nome: 'S & A Móveis Planejados',

  /* ------------------------------------------------------------------------
     WHATSAPP
     Somente números, com código do país (55) e DDD.
     Exemplo: '5565999998888'
     Enquanto estiver vazio, os botões de WhatsApp levam à página de contato.
     ------------------------------------------------------------------------ */
  whatsapp: '',

  /* Mensagem inicial que abre na conversa */
  whatsappMensagem: 'Olá! Conheci a S & A pelo site e gostaria de conversar sobre um projeto de móveis planejados.',

  /* ------------------------------------------------------------------------
     REDES E CONTATO
     instagram: endereço completo do perfil, ex.: 'https://instagram.com/seuperfil'
     instagramUsuario: como aparece no site, ex.: '@seuperfil'
     email: ex.: 'contato@seudominio.com.br'
     telefoneExibicao: como o número aparece escrito, ex.: '(65) 99999-8888'
     ------------------------------------------------------------------------ */
  instagram: '',
  instagramUsuario: '',
  email: '',
  telefoneExibicao: '',

  /* Localização */
  cidade: 'Tangará da Serra, MT',
  endereco: '',            /* ex.: 'Rua Exemplo, 123 — Centro' (deixe vazio se não quiser exibir) */
  mapaUrl: '',             /* link do Google Maps, se desejar */
  horario: '',             /* ex.: 'Segunda a sexta, 8h às 18h' */

  /* ------------------------------------------------------------------------
     FORMULÁRIO DE ORÇAMENTO
     Endereço do serviço que recebe o formulário (POST multipart/form-data).
     Compatível com Formspree (https://formspree.io/f/SEU_ID), Getform,
     Basin, FormSubmit ou um backend próprio.
     Enquanto estiver vazio, o site NÃO finge que enviou: ele informa que o
     envio online não está ativo e oferece WhatsApp / e-mail com os dados
     preenchidos.
     ------------------------------------------------------------------------ */
  formEndpoint: '',

  /* Limites dos anexos de referência */
  anexosMaxArquivos: 5,
  anexosMaxMB: 8,

  /* ------------------------------------------------------------------------
     MARCADORES DE CONTEÚDO PROVISÓRIO
     true  = mostra etiquetas "Imagem provisória" / "Texto provisório"
     false = esconde as etiquetas (use quando o conteúdo real estiver no ar)
     ------------------------------------------------------------------------ */
  mostrarMarcadoresProvisorios: false,

  /* Endereço final do site (usado em links de compartilhamento) */
  url: 'https://www.seudominio.com.br'
};
