const data = new Date();
const dias = 3;

function isDiaUtil(date) {
  const diaDaSemana = date.getDay(); // 0 para domingo, 1 para segunda, etc.
  return diaDaSemana !== 0 && diaDaSemana !== 6; // Retorna true se não for domingo (0) ou sábado (6).
}

function addDiasUteis(date, days) {
  let diasAdicionados = 0;

  while (diasAdicionados < days) {
    date.setDate(date.getDate() + 1);

    if (isDiaUtil(date)) {
      diasAdicionados++;
    }
  }

  return date.toISOString().slice(0, 10).split('-').reverse().join('/');
}

const novaData = addDiasUteis(data, dias);

console.log(novaData);