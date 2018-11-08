let check = (dados) => {
  let result = {
    success: true,
    message: 'Paciente estável'
  }

  if (dados.batimentos) {
    if (dados.batimentos < 60) {
      result.success = false
      result.message = `Paciente com bradicardia, valor: ${dados.batimentos}`
    }

    if (dados.batimentos > 100) {
      result.success = false
      result.message = `Paciente com taquicardia, valor: ${dados.batimentos}`
    }
  }
  
  
  if (dados.pressao) {
    if (dados.pressao.sistolica > 140 || dados.pressao.diastolica > 90) {
      result.success = false
      result.message = `Paciente com pressão alta, valor: ${dados.pressao.sistolica + '/' + dados.pressao.diastolica}`
    }

    if (dados.pressao.sistolica < 100 || dados.pressao.diastolica < 60) {
      result.success = false
      result.message = `Paciente com pressão baixa, valor: ${dados.pressao.sistolica + '/' + dados.pressao.diastolica}`
    }
  }

  if (dados.vo2) {
    if (dados.vo2 >= 16 && dados.vo2 <= 18) {
      result.success = false
      result.message = `Paciente cardiaco gravemente enfermo, valor: ${dados.vo2}`
    }
    
    if (dados.vo2 > 18 && dados.vo2 <= 22) {
      result.success = false
      result.message = `Paciente cardiaco moderadamente enfermo, valor: ${dados.vo2}`
    }
  }

  return result
}

module.exports = check