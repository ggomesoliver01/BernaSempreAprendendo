// Sua variável com frases







const texto = "maquina de lavar"

// Lista de palavras-chave
const palavrasChave = [
  'COSTURA',
  'MARTELETE',
  'MICRO RETIFICA',
  'KIT MULTIUSO',
  'MOTOBOMBA',
  'MOTOCOMPRESSOR',
  'MOTOESMERIL',
  'MOTOSERRA',
  'CENTRIFUGA DE FRUTAS',
  'KIT CREATIVE GOURMET',
  'MULTIPRO.',
  'MULTIPROC',
  'MULTIPROCESSADOR',
  'NUTRI NINJA',
  'PROCESSADOR',
  'MULTICHEF',
  'SHARK NUTRI',
  'PAN ELET',
  'PLAINA ELETRICA',
  'PANIFICADORA',
  'PARAFUSADEIRA',
  'PARAFU FURAD',
  'PISTOLA PINTURA',
  'PISTOLA PULVERIZADORA',
  'POLITRIZ',
  'PRAN GAMA',
  'ROCADEIRA',
  'SECADOR',
  'SERRA CIRCULAR',
  'SERRA',
  'SOVADEIRA',
  'TABLET',
  'SOPRADOR'
];

// Verifica se a variável contém alguma palavra-chave
const contemPalavraChave = palavrasChave.some(palavra => new RegExp('\\b' + palavra + '\\b', 'i').test(texto));

// Define o valor da empresa com base na condição
const resultado = contemPalavraChave ? 146 : 64;

// Imprime o resultado
console.log(resultado);