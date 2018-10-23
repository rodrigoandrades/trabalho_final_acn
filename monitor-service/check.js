let check = (dados) => {
  let result = {
    success: true,
    message: ''
  }

  if (!dados.batimentos) {
    result.success = false
    return `Dados de batimento do Paciente não disponível`
  }

  if (dados.batimentos < 60) {
    result.success = false
    result.message = `Paciente com bradicardia, valor: ${dados.batimentos}`
  }

  if (dados.batimentos > 100) {
    result.success = false
    result.message = `Paciente com taquicardia, valor: ${dados.batimentos}`
  }

  
  
  if (!dados.pressao) {
    result.success = false
    result.message = `Dados da pressão do Paciente não disponível`
  }

  if (dados.pressao.sistolica > 140 || dados.pressao.diastolica > 90) {
    result.success = false
    result.message = `Paciente com pressão alta, valor: ${dados.pressao.sistolica + '/' + dados.pressao.diastolica}`
  }

  if (dados.pressao.sistolica < 100 || dados.pressao.diastolica < 60) {
    result.success = false
    result.message = `Paciente com pressão baixa, valor: ${dados.pressao.sistolica + '/' + dados.pressao.diastolica}`
  }

  return result
}

module.exports = check