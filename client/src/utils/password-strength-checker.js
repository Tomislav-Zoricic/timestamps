import owasp from 'owasp-password-strength-test'

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 4,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4
})

export default owasp
