/**
 * CONTEÚDO — extraído e organizado exclusivamente a partir do guia_estudos_GQ.pdf
 * (Teoria/Filosofia do Direito — JUR1060/JUR1063, Prof. Manoel Uchôa, Monitora Carolina Braga).
 * Nada aqui foi inventado: tudo decorre dos textos da apostila (Tipos de Normas;
 * Kelsen; Guastini) e dos casos práticos (Desacato; ADI 6457).
 */

const SUBJECTS = [
  { id: 'normas',    name: 'Tipos de Normas Jurídicas',        short: 'Normas',        color: '#a78bfa' },
  { id: 'kelsen',    name: 'A Interpretação — Kelsen',         short: 'Kelsen',        color: '#22d3ee' },
  { id: 'guastini',  name: 'Análise da Sentença — Guastini',   short: 'Guastini',      color: '#f59e0b' },
  { id: 'desacato',  name: 'Caso 1 — Desacato',                short: 'Desacato',      color: '#34d399' },
  { id: 'adi6457',   name: 'ADI 6457 — Forças Armadas',        short: 'ADI 6457',      color: '#f472b6' },
];

// ============ MÚLTIPLA ESCOLHA ============
const MCQ = [
  {
    id: 'mcq1', subject: 'normas', difficulty: 'Fácil',
    question: 'Segundo o material de Manoel Uchôa, as normas jurídicas dividem-se em duas grandes categorias. Quais são elas?',
    options: [
      { key: 'A', text: 'Normas gerais e normas individuais' },
      { key: 'B', text: 'Normas de conduta e normas de estrutura' },
      { key: 'C', text: 'Normas imperativas e normas permissivas' },
      { key: 'D', text: 'Normas primárias e normas constitutivas' },
    ],
    answer: 'B',
    explanation: 'O PDF distingue duas grandes categorias: normas de conduta, que determinam comportamentos (permitir, proibir, obrigar) e vinculam a conduta a uma consequência jurídica; e normas de estrutura, que se referem à produção e à aplicação de outras normas, conferindo poder (competência) e estabelecendo meios e fins (procedimentos).',
  },
  {
    id: 'mcq2', subject: 'normas', difficulty: 'Fácil',
    question: 'Qual é a função das normas de estrutura (normas secundárias)?',
    options: [
      { key: 'A', text: 'Determinar comportamentos obrigatórios dos cidadãos' },
      { key: 'B', text: 'Instituir sanções penais para crimes' },
      { key: 'C', text: 'Referir-se à produção e à aplicação de outras normas, garantindo que as normas de conduta sejam concretizadas' },
      { key: 'D', text: 'Ser exclusivas da Constituição Federal' },
    ],
    answer: 'C',
    explanation: 'As normas de estrutura regulam a dinâmica jurídica: referem-se à produção e à aplicação de outras normas e garantem que as normas de conduta sejam concretizadas. Conferem poder (competência) e estabelecem meios e fins (procedimentos).',
  },
  {
    id: 'mcq3', subject: 'normas', difficulty: 'Médio',
    question: 'De acordo com o PDF, as normas constitutivas (Searle, Rawls) são aquelas que:',
    options: [
      { key: 'A', text: 'Instituem que algo deve ser feito pelo destinatário' },
      { key: 'B', text: 'Atribuem valor jurídico a uma situação de fato ("X tem valor V no contexto C")' },
      { key: 'C', text: 'Fixam tarefas e objetivos do Estado' },
      { key: 'D', text: 'Dispõem sobre o exercício procedimental da competência' },
    ],
    answer: 'B',
    explanation: 'Normas constitutivas atribuem valor jurídico a uma situação de fato, conforme a fórmula "X tem valor V no contexto C". O exemplo do PDF é o art. 53 do Código Civil. Já as que instituem dever de fazer são normas que obrigam (ex.: art. 5º, LXXV, CF), e as que fixam objetivos do Estado são as normas programáticas (ex.: art. 3º, CF).',
  },
  {
    id: 'mcq4', subject: 'normas', difficulty: 'Médio',
    question: 'O art. 3º da CF/88, que enumera os objetivos fundamentais da República, é citado no PDF como exemplo de:',
    options: [
      { key: 'A', text: 'Norma que obriga/im impõe fazer' },
      { key: 'B', text: 'Norma de competência' },
      { key: 'C', text: 'Norma programática/de finalidade' },
      { key: 'D', text: 'Norma sobre eliminação de normas' },
    ],
    answer: 'C',
    explanation: 'O PDF classifica o art. 3º da CF/88 como norma programática (ou de finalidade): normas constitucionais/internacionais que contêm tarefas e objetivos do Estado.',
  },
  {
    id: 'mcq5', subject: 'normas', difficulty: 'Médio',
    question: 'Na classificação de Norberto Bobbio (normas imperativas de 2ª instância), a categoria "mandam proibir" — em que a Constituição obriga o legislador ordinário a vedar determinada matéria — tem como exemplo o:',
    options: [
      { key: 'A', text: 'Art. 5º, XXXII, da CF (defesa do consumidor)' },
      { key: 'B', text: 'Art. 5º, XXXVI, da CF (direito adquirido, ato jurídico perfeito, coisa julgada)' },
      { key: 'C', text: 'Art. 37, VII, da CF (direito de greve)' },
      { key: 'D', text: 'Art. 225, §7º, da CF (práticas desportivas com animais)' },
    ],
    answer: 'B',
    explanation: 'Em "mandam proibir" (ou "proíbem permitir"), o constituinte obriga o legislador a vedar a matéria — o exemplo do PDF é o art. 5º, XXXVI. O art. 5º, XXXII é exemplo de "mandam ordenar"; o art. 37, VII, de "permitem proibir"; e o art. 225, §7º, de "permitem permitir".',
  },
  {
    id: 'mcq6', subject: 'normas', difficulty: 'Difícil',
    question: 'Segundo Bobbio, quando o constituinte atribui permissão constitucional nova a situação antes proibida (ex.: art. 225, §7º, CF), estamos diante da categoria:',
    options: [
      { key: 'A', text: 'Proíbem ordenar' },
      { key: 'B', text: 'Permitem proibir' },
      { key: 'C', text: 'Permitem permitir' },
      { key: 'D', text: 'Mandam ordenar' },
    ],
    answer: 'C',
    explanation: 'Em "permitem permitir", o constituinte atribui permissão constitucional nova a situação antes proibida — o exemplo do PDF é o art. 225, §7º, sobre práticas desportivas com animais.',
  },
  {
    id: 'mcq7', subject: 'kelsen', difficulty: 'Fácil',
    question: 'Para Kelsen (Teoria Pura do Direito), a interpretação é:',
    options: [
      { key: 'A', text: 'Um ato exclusivo do Poder Judiciário' },
      { key: 'B', text: 'Uma operação mental que acompanha a aplicação do Direito no percurso de um escalão superior para um escalão inferior' },
      { key: 'C', text: 'A atividade de descobrir a vontade histórica do legislador' },
      { key: 'D', text: 'Um mecanismo restrito à doutrina jurídica' },
    ],
    answer: 'B',
    explanation: 'Kelsen entende a interpretação como operação mental que acompanha o processo de aplicação do Direito, no percurso de um escalão superior para um inferior (da norma geral para a norma individual). Ela ocorre em todos os níveis do ordenamento, não apenas no Judiciário.',
  },
  {
    id: 'mcq8', subject: 'kelsen', difficulty: 'Fácil',
    question: 'A interpretação AUTÊNTICA, segundo Kelsen, é aquela feita:',
    options: [
      { key: 'A', text: 'Pela doutrina, com valor meramente cognoscitivo' },
      { key: 'B', text: 'Por qualquer cidadão que observa o Direito' },
      { key: 'C', text: 'Por órgão jurídico competente no ato de aplicação do Direito, produzindo uma norma nova e vinculante' },
      { key: 'D', text: 'Apenas pelo legislador, ao editar a lei' },
    ],
    answer: 'C',
    explanation: 'A interpretação autêntica é realizada por órgão jurídico competente no ato de aplicação do Direito e produz uma norma nova e vinculante. A interpretação não-autêntica (ex.: a da doutrina) tem valor cognoscitivo, mas não cria norma jurídica.',
  },
  {
    id: 'mcq9', subject: 'kelsen', difficulty: 'Médio',
    question: 'Sobre a interpretação não-autêntica, é correto afirmar que:',
    options: [
      { key: 'A', text: 'Ela vincula os órgãos judiciais' },
      { key: 'B', text: 'Ela produz normas jurídicas novas' },
      { key: 'C', text: 'Ela possui valor cognoscitivo, mas não cria norma jurídica — exemplo: a interpretação feita pela doutrina' },
      { key: 'D', text: 'Ela só existe na esfera administrativa' },
    ],
    answer: 'C',
    explanation: 'O PDF destaca que a interpretação não-autêntica é realizada por quem não tem poder para aplicar o Direito — por exemplo, a doutrina — e tem valor cognoscitivo, mas não cria norma jurídica.',
  },
  {
    id: 'mcq10', subject: 'kelsen', difficulty: 'Difícil',
    question: 'Segundo o capítulo de Kelsen analisado no guia, quem mais precisa interpretar o Direito?',
    options: [
      { key: 'A', text: 'Apenas os juízes, ao proferir sentenças' },
      { key: 'B', text: 'Apenas os órgãos que aplicam o Direito, em qualquer escalão' },
      { key: 'C', text: 'Também os indivíduos que apenas observam o Direito (cumprindo condutas que evitam a sanção) precisam compreender e interpretar o sentido das normas' },
      { key: 'D', text: 'Somente os membros do Poder Legislativo' },
    ],
    answer: 'C',
    explanation: 'Kelsen afirma que, além dos órgãos que aplicam o Direito (em todos os escalões: leis, Constituição, tratados, normas individuais), também os indivíduos que apenas observam o Direito precisam compreender — e, portanto, interpretar — o sentido das normas que os vinculam.',
  },
  {
    id: 'mcq11', subject: 'guastini', difficulty: 'Fácil',
    question: 'Guastini denomina o modelo de análise da sentença que julga a decisão pela sua conformidade com as normas e princípios do sistema jurídico de:',
    options: [
      { key: 'A', text: 'Consequencialista ou pragmático' },
      { key: 'B', text: 'Deontológico ou normativo' },
      { key: 'C', text: 'Historiográfico' },
      { key: 'D', text: 'Sociológico empírico' },
    ],
    answer: 'B',
    explanation: 'O modelo deontológico (ou normativo) julga a sentença pela sua conformidade com as normas e princípios do sistema jurídico. Já o consequencialista (ou pragmático) julga a decisão pelas suas consequências práticas — sociais, econômicas e institucionais.',
  },
  {
    id: 'mcq12', subject: 'guastini', difficulty: 'Médio',
    question: 'A dicotomia utilizada por Guastini para analisar sentenças foi emprestada de uma classificação das doutrinas morais. Nessa classificação, as doutrinas consequencialistas:',
    options: [
      { key: 'A', text: 'Fazem depender o caráter moral de uma ação da sua conformidade com uma norma ou princípio' },
      { key: 'B', text: 'Fazem depender o caráter moral de uma ação da soma das suas consequências' },
      { key: 'C', text: 'Negam que ações possam ser moralmente julgadas' },
      { key: 'D', text: 'São aplicáveis apenas à análise da doutrina, nunca das sentenças' },
    ],
    answer: 'B',
    explanation: 'Dizem-se deontológicas as doutrinas que fazem depender o caráter moral de uma ação da sua conformidade com norma ou princípio; consequencialistas são as que o fazem depender da soma das suas consequências. Guastini aplica essa dicotomia à análise de sentenças — e também de doutrina.',
  },
  {
    id: 'mcq13', subject: 'desacato', difficulty: 'Fácil',
    question: 'No Caso 1 (Desacato), o juiz Alexandre Morais da Rosa utilizou como técnica principal de julgamento:',
    options: [
      { key: 'A', text: 'Controle difuso de constitucionalidade' },
      { key: 'B', text: 'Controle de convencionalidade — usando tratados internacionais de Direitos Humanos como parâmetro, ao lado da Constituição' },
      { key: 'C', text: 'Súmula vinculante do STF' },
      { key: 'D', text: 'Análise econômica do Direito' },
    ],
    answer: 'B',
    explanation: 'O juiz realizou controle de convencionalidade: além da Constituição, usou como parâmetro os tratados internacionais de Direitos Humanos, que formam o "bloco de constitucionalidade" (CF/88, art. 5º, §§2º e 3º).',
  },
  {
    id: 'mcq14', subject: 'desacato', difficulty: 'Médio',
    question: 'Segundo o precedente do STF no RE 466.343 (Min. Gilmar Mendes), citado no caso, os tratados de Direitos Humanos NÃO aprovados pelo rito do art. 5º, §3º, da CF possuem status:',
    options: [
      { key: 'A', text: 'Constitucional, equiparado à Constituição' },
      { key: 'B', text: 'Legal, no mesmo nível das leis ordinárias' },
      { key: 'C', text: 'Supralegal — abaixo da Constituição, mas acima da legislação ordinária, tornando inaplicável a lei interna que os contrarie' },
      { key: 'D', text: 'Meramente internacional, sem efeitos internos' },
    ],
    answer: 'C',
    explanation: 'O RE 466.343 firmou que tratados de Direitos Humanos sem o rito do art. 5º, §3º, têm status supralegal: ficam abaixo da Constituição, mas acima da legislação ordinária, o que torna inaplicável a lei interna que os contrarie.',
  },
  {
    id: 'mcq15', subject: 'desacato', difficulty: 'Médio',
    question: 'O item 11 da Declaração de Princípios sobre a Liberdade de Expressão da Comissão Interamericana de Direitos Humanos (2000), invocado no caso, estabelece que:',
    options: [
      { key: 'A', text: 'As leis de desacato são válidas desde que aplicadas com moderação' },
      { key: 'B', text: 'As leis que punem a expressão ofensiva contra funcionários públicos ("leis de desacato") atentam contra a liberdade de expressão e o direito à informação, contrariando o art. 13 da Convención Americana' },
      { key: 'C', text: 'A liberdade de expressão não se aplica a abordagens policiais' },
      { key: 'D', text: 'O desacato deve ser punido com pena maior que a do crime de resistência' },
    ],
    answer: 'B',
    explanation: 'A Declaração (item 11) estabelece que as "leis de desacato" atentam contra a liberdade de expressão e o direito à informação — o que contraria o art. 13 da Convenção Americana de Direitos Humanos (Pacto de San José).',
  },
  {
    id: 'mcq16', subject: 'desacato', difficulty: 'Difícil',
    question: 'No Caso 1, o acusado foi ABSOLVIDO também do crime de resistência (art. 329, CP). Qual o fundamento?',
    options: [
      { key: 'A', text: 'A prescrição da pretensão punitiva' },
      { key: 'B', text: 'O princípio da fragmentariedade do Direito Penal' },
      { key: 'C', text: 'O sistema processual acusatório (Ferrajoli, Binder): como o próprio Ministério Público pediu a absolvição desse crime, o juiz não pode condenar' },
      { key: 'D', text: 'A aplicação da Lei da Ficha Limpa' },
    ],
    answer: 'C',
    explanation: 'Quanto à resistência, o juiz aplicou o sistema processual acusatório (conforme Ferrajoli e Binder): como o próprio MP pediu a absolvição, o juiz não pode condenar — sob pena de fraude ao sistema acusatório e violação da separação entre acusar e julgar.',
  },
  {
    id: 'mcq17', subject: 'adi6457', difficulty: 'Fácil',
    question: 'Na ADI 6457, o STF (Tribunal Pleno, Rel. Min. Luiz Fux, julgamento em 09/04/2024) decidiu que:',
    options: [
      { key: 'A', text: 'As Forças Armadas exercem um poder moderador entre os três Poderes, como na Constituição Imperial de 1824' },
      { key: 'B', text: 'A Constituição de 1988 adotou a tripartição de poderes — não existe "poder moderador" militar' },
      { key: 'C', text: 'O Presidente pode usar as Forças Armadas contra o Judiciário em situações de crise' },
      { key: 'D', text: 'A GLO é medida ordinária e permanente de segurança' },
    ],
    answer: 'B',
    explanation: 'A tese central do STF: a missão institucional das Forças Armadas (defesa da Pátria, garantia dos poderes constitucionais e garantia da lei e da ordem) NÃO comporta o exercício de poder moderador entre os Poderes. A CF/88 adotou a tripartição de poderes.',
  },
  {
    id: 'mcq18', subject: 'adi6457', difficulty: 'Médio',
    question: 'Segundo as teses fixadas na ADI 6457, o emprego das Forças Armadas:',
    options: [
      { key: 'A', text: 'Pode ser autorizado por qualquer autoridade administrativa' },
      { key: 'B', text: 'Só pode ser autorizado pelo Presidente da República, por iniciativa própria ou a pedido dos presidentes do STF, do Senado ou da Câmara — e nunca pode ser usado por um Poder contra outro' },
      { key: 'C', text: 'Depende de autorização prévia do Ministério Público' },
      { key: 'D', text: 'É decisão exclusiva do Comando Militar' },
    ],
    answer: 'B',
    explanation: 'O emprego das Forças Armadas só pode ser autorizado pelo Presidente, por iniciativa própria ou a pedido dos presidentes do STF, do Senado ou da Câmara — e nunca pode ser usado por um Poder contra outro.',
  },
  {
    id: 'mcq19', subject: 'adi6457', difficulty: 'Médio',
    question: 'Sobre a "Garantia da Lei e da Ordem" (GLO), conforme a ADI 6457, é correto afirmar que se trata de:',
    options: [
      { key: 'A', text: 'Medida subsidiária e excepcional, cabível após esgotados os mecanismos ordinários, diante de grave e concreta violação à segurança pública, sob controle permanente dos demais Poderes' },
      { key: 'B', text: 'Instrumento de policiamento ostensivo do dia a dia' },
      { key: 'C', text: 'Atribuição privativa das polícias militares estaduais' },
      { key: 'D', text: 'Medida que dispensa controle de qualquer outro Poder' },
    ],
    answer: 'A',
    explanation: 'A GLO é medida subsidiária e excepcional: só cabe após esgotados os mecanismos ordinários, diante de grave e concreta violação à segurança pública, e permanece sob controle permanente dos demais Poderes.',
  },
  {
    id: 'mcq20', subject: 'adi6457', difficulty: 'Fácil',
    question: 'O resultado final da ADI 6457 foi:',
    options: [
      { key: 'A', text: 'Ação julgada totalmente improcedente' },
      { key: 'B', text: 'Ação julgada parcialmente procedente, com interpretação conforme a Constituição conferida aos dispositivos impugnados da LC 97/1999' },
      { key: 'C', text: 'Declaração de inconstitucionalidade do art. 142 da CF sem modulação' },
      { key: 'D', text: 'Prejudicada por falta de interesse de agir' },
    ],
    answer: 'B',
    explanation: 'Por unanimidade, o STF converteu a medida cautelar referendada em julgamento de mérito e julgou a ação PARCIALMENTE PROCEDENTE, conferindo interpretação conforme a Constituição aos dispositivos impugnados da LC 97/1999.',
  },
];

// ============ VERDADEIRO OU FALSO ============
const VF = [
  {
    id: 'vf1', subject: 'normas', isTrue: true,
    statement: 'As normas de conduta vinculam a expectativa de conduta dos indivíduos a uma consequência jurídica (sanção), definindo o conteúdo específico de um dever jurídico.',
    explanation: 'Verdadeiro. É exatamente assim que o PDF define as normas de conduta (estática jurídica): determinam comportamentos e vinculam a expectativa de conduta a uma consequência jurídica, que é a sanção.',
  },
  {
    id: 'vf2', subject: 'normas', isTrue: false,
    statement: 'As normas de estrutura definem diretamente o comportamento obrigatório dos cidadãos, como proibir ou obrigar condutas.',
    explanation: 'Falso. Definir comportamentos é papel das normas de CONDUTA. As normas de estrutura referem-se à produção e à aplicação de outras normas — dizem quem e como se produzem e aplicam normas (fontes, validade, interpretação, competência etc.).',
  },
  {
    id: 'vf3', subject: 'normas', isTrue: true,
    statement: 'As normas secundárias incluem regras sobre fontes, produção de normas, modificação, interpretação, sanção, eliminação e aplicação de normas.',
    explanation: 'Verdadeiro. O PDF lista como normas secundárias: de modificação, sobre interpretação, interpretativas, que estabelecem sanção, sobre eliminação de normas, sobre aplicação, sobre fontes, sobre produção de normas, de competência e de exercício.',
  },
  {
    id: 'vf4', subject: 'kelsen', isTrue: false,
    statement: 'Segundo Kelsen, apenas os juízes interpretam o Direito.',
    explanation: 'Falso. Para Kelsen, a interpretação ocorre em todos os escalões do ordenamento (Legislativo, tratados, normas individuais, negócios jurídicos) e, além dos órgãos que aplicam o Direito, também os indivíduos que apenas o observam precisam interpretar o sentido das normas.',
  },
  {
    id: 'vf5', subject: 'kelsen', isTrue: true,
    statement: 'A interpretação autêntica, segundo Kelsen, é feita por órgão jurídico competente e produz uma norma nova e vinculante.',
    explanation: 'Verdadeiro. A interpretação autêntica é realizada por órgão jurídico competente no ato de aplicação do Direito e produz uma norma nova e vinculante, ao contrário da não-autêntica, que tem apenas valor cognoscitivo.',
  },
  {
    id: 'vf6', subject: 'guastini', isTrue: false,
    statement: 'No modelo deontológico (normativo) de Guastini, a sentença é julgada pelas suas consequências práticas, sociais e econômicas.',
    explanation: 'Falso. O modelo deontológico/normativo julga a sentença pela sua conformidade com as normas e princípios do sistema jurídico. Quem julga pelas consequências práticas (sociais, econômicas, institucionais) é o modelo consequencialista/pragmático.',
  },
  {
    id: 'vf7', subject: 'guastini', isTrue: true,
    statement: 'Segundo Guastini, a dicotomia entre análise normativa e análise pragmática também pode ser aplicada aos modos de análise da doutrina, não apenas das sentenças.',
    explanation: 'Verdadeiro. Guastini observa explicitamente que a mesma dicotomia pode ser aplicada aos modos de análise da doutrina, não apenas das sentenças propriamente ditas.',
  },
  {
    id: 'vf8', subject: 'desacato', isTrue: true,
    statement: 'O controle de convencionalidade utiliza tratados internacionais de Direitos Humanos como parâmetro de julgamento, ao lado da Constituição.',
    explanation: 'Verdadeiro. O controle de convencionalidade usa os tratados internacionais de Direitos Humanos (que formam o "bloco de constitucionalidade", CF/88, art. 5º, §§2º e 3º) como parâmetro, além da Constituição.',
  },
  {
    id: 'vf9', subject: 'desacato', isTrue: false,
    statement: 'Segundo o RE 466.343 do STF, os tratados de Direitos Humanos com status supralegal ficam acima da Constituição.',
    explanation: 'Falso. O status supralegal significa que os tratados ficam ABAIXO da Constituição, mas ACIMA da legislação ordinária — o que torna inaplicável a lei interna que os contrarie. Não estão acima da CF.',
  },
  {
    id: 'vf10', subject: 'desacato', isTrue: false,
    statement: 'No Caso 1, o juiz condenou o acusado pelo crime de desacato (art. 331, CP).',
    explanation: 'Falso. O acusado foi ABSOLVIDO de ambos os crimes (desacato e resistência). A denúncia foi julgada improcedente com base no art. 386, III e VII, do CPP, por atipicidade convencional e pelo pedido de absolvição do próprio MP.',
  },
  {
    id: 'vf11', subject: 'adi6457', isTrue: false,
    statement: 'Segundo a ADI 6457, as Forças Armadas podem ser empregadas por um Poder contra outro, como instrumento de "poder moderador".',
    explanation: 'Falso. O STF decidiu exatamente o contrário: não existe poder moderador militar na CF/88, e o emprego das Forças Armadas nunca pode ser usado por um Poder contra outro.',
  },
  {
    id: 'vf12', subject: 'adi6457', isTrue: true,
    statement: 'A chefia das Forças Armadas pelo Presidente da República é um poder limitado, que não pode ser usada para intromissão indevida no funcionamento independente dos demais Poderes.',
    explanation: 'Verdadeiro. Essa é uma das teses fixadas pelo STF na ADI 6457: a chefia presidencial das Forças Armadas é poder limitado, sem autoridade para interferir nos demais Poderes.',
  },
];

// ============ QUESTÕES ABERTAS ============
const OPEN = [
  {
    id: 'open1', subject: 'normas', difficulty: 'Médio',
    prompt: 'Explique a distinção entre normas de conduta e normas de estrutura, indicando a função de cada uma e um exemplo de cada categoria.',
    keywords: ['conduta', 'estrutura', 'comportamento', 'sanção', 'produção', 'aplicação', 'competência'],
    modelAnswer: 'Normas de conduta determinam comportamentos (permitir, proibir, obrigar) e vinculam a expectativa de conduta a uma consequência jurídica (sanção), definindo o conteúdo de um dever jurídico (estática jurídica). Ex.: art. 5º, LXXV, CF (dever de indenizar por erro judiciário). Normas de estrutura referem-se à produção e à aplicação de outras normas, garantindo que as normas de conduta sejam concretizadas: conferem poder (competência) e estabelecem meios e fins (procedimentos). Ex.: regras sobre fontes (CC, art. 4º), sobre produção de normas (CF, art. 60) e de competência (LGPD, art. 55-A, criação da ANPD).',
  },
  {
    id: 'open2', subject: 'kelsen', difficulty: 'Fácil',
    prompt: 'Segundo Kelsen, o que é a interpretação jurídica? Diferencie interpretação autêntica de interpretação não-autêntica.',
    keywords: ['operação mental', 'aplicação', 'escalão', 'autêntica', 'órgão competente', 'vinculante', 'não-autêntica', 'doutrina', 'cognoscitivo'],
    modelAnswer: 'Para Kelsen, interpretar é a operação mental que acompanha a aplicação do Direito no percurso de um escalão superior para um inferior (da norma geral para a norma individual), ocorrendo em todos os níveis do ordenamento. Interpretação autêntica: feita por órgão jurídico competente no ato de aplicação do Direito; produz uma norma nova e vinculante. Interpretação não-autêntica: feita por quem não tem esse poder (ex.: a doutrina); tem valor cognoscitivo, mas não cria norma jurídica.',
  },
  {
    id: 'open3', subject: 'guastini', difficulty: 'Médio',
    prompt: 'Apresente os dois modelos de análise da sentença identificados por Riccardo Guastini e explique em que se diferenciam.',
    keywords: ['deontológico', 'normativo', 'conformidade', 'normas', 'princípios', 'consequencialista', 'pragmático', 'consequências', 'sociais', 'econômicas', 'institucionais'],
    modelAnswer: 'Guastini identifica dois modelos: (1) deontológico/normativo — julga a decisão pela sua conformidade com as normas e princípios do sistema jurídico; (2) consequencialista/pragmático — julga a decisão pelas suas consequências práticas: sociais, econômicas e institucionais. A dicotomia é emprestada das doutrinas morais e pode ser aplicada tanto às sentenças quanto à análise da própria doutrina.',
  },
  {
    id: 'open4', subject: 'desacato', difficulty: 'Médio',
    prompt: 'O que é o controle de convencionalidade e como ele foi aplicado no Caso 1 (crime de desacato)?',
    keywords: ['convencionalidade', 'tratados', 'direitos humanos', 'parâmetro', 'Constituição', 'bloco de constitucionalidade', 'liberdade de expressão', 'desacato'],
    modelAnswer: 'Controle de convencionalidade é a técnica em que o julgador, além da Constituição (controle de constitucionalidade), utiliza como parâmetro os tratados internacionais de Direitos Humanos, que integram o "bloco de constitucionalidade" (art. 5º, §§2º e 3º, CF). No Caso 1, o juiz declarou a atipicidade convencional do desacato (art. 331, CP) porque o item 11 da Declaração de Princípios sobre Liberdade de Expressão da CIDH considera as "leis de desacato" contrárias à liberdade de expressão (art. 13 da Convenção Americana), invocando ainda os princípios da fragmentariedade e da intervenção mínima do Direito Penal.',
  },
  {
    id: 'open5', subject: 'desacato', difficulty: 'Difícil',
    prompt: 'Qual o status normativo dos tratados internacionais de Direitos Humanos no direito brasileiro, segundo o RE 466.343 do STF? Explique o que significa ser "supralegal".',
    keywords: ['supralegal', 'RE 466.343', 'Constituição', 'legislação ordinária', 'inaplicável', 'art. 5º §3º'],
    modelAnswer: 'Segundo o RE 466.343 (Min. Gilmar Mendes), tratados de Direitos Humanos NÃO aprovados pelo rito do art. 5º, §3º, da CF têm status supralegal: ficam ABAIXO da Constituição, mas ACIMA da legislação ordinária. Isso significa que a lei interna que contrariar o tratado fica INAPLICÁVEL, mas o tratado não pode prevalecer sobre a Constituição.',
  },
  {
    id: 'open6', subject: 'adi6457', difficulty: 'Médio',
    prompt: 'Explique o que decidiu o STF na ADI 6457 sobre a existência de um "poder moderador" das Forças Armadas.',
    keywords: ['poder moderador', 'tripartição', '1988', '1824', 'missão institucional', 'garantia dos poderes', 'chefia', 'limitado'],
    modelAnswer: 'O STF (Tribunal Pleno, Rel. Min. Luiz Fux, 09/04/2024) decidiu que a CF/88 adotou a tripartição de poderes e que a missão institucional das Forças Armadas — defesa da Pátria, garantia dos poderes constitucionais e garantia da lei e da ordem — NÃO comporta o exercício de poder moderador entre os Poderes, ao contrário do que previa a Constituição Imperial de 1824. A chefia das Forças Armadas pelo Presidente é um poder limitado, sem intromissão nos demais Poderes.',
  },
  {
    id: 'open7', subject: 'normas', difficulty: 'Difícil',
    prompt: 'Cite e explique pelo menos três tipos de normas primárias (de conduta) apresentados no material, com seus exemplos.',
    keywords: ['obrigam', 'proíbem', 'permitem', 'omissão', 'competência', 'constitutivas', 'programáticas'],
    modelAnswer: 'O PDF apresenta sete tipos de normas primárias: (1) que obrigam — instituem que algo deve ser feito (CF, art. 5º, LXXV); (2) que proíbem — garantem que algo não seja feito (CC, art. 58); (3) que permitem — sentido fraco (nem proibido nem obrigatório) ou forte (faculdade garantida contra terceiros, ex.: CF, art. 5º, IX); (4) omissão/obrigação de omitir (CC, art. 888); (5) de competência — atribuem poder de produzir atos normativos (CF, art. 90); (6) constitutivas — atribuem valor jurídico a situação de fato (CC, art. 53); (7) programáticas/de finalidade — tarefas e objetivos do Estado (CF, art. 3º).',
  },
  {
    id: 'open8', subject: 'adi6457', difficulty: 'Médio',
    prompt: 'Quais são as regras fixadas pelo STF na ADI 6457 quanto ao emprego das Forças Armadas e à Garantia da Lei e da Ordem (GLO)?',
    keywords: ['Presidente', 'iniciativa própria', 'STF', 'Senado', 'Câmara', 'nunca', 'um Poder contra outro', 'subsidiária', 'excepcional', 'esgotados', 'controle'],
    modelAnswer: 'Teses fixadas: (1) o emprego das Forças Armadas só pode ser autorizado pelo Presidente da República, por iniciativa própria ou a pedido dos presidentes do STF, do Senado ou da Câmara — e nunca pode ser usado por um Poder contra outro; (2) a GLO é medida subsidiária e excepcional, cabível após esgotados os mecanismos ordinários, diante de grave e concreta violação à segurança pública, sob controle permanente dos demais Poderes.',
  },
];

// ============ RESUMOS ============
const SUMMARIES = [
  {
    subject: 'normas',
    quick: [
      'Duas grandes categorias: normas de CONDUTA (estática) e normas de ESTRUTURA (dinâmica).',
      'Normas de conduta: obrigam, proíbem, permitem, omissão, competência, constitutivas e programáticas.',
      'Normas de estrutura: modificação, interpretação, sanção, eliminação, aplicação, fontes, produção, competência e exercício.',
      'Bobbio (normas imperativas de 2ª instância): como a Constituição orienta o legislador ordinário.',
    ],
    detailed: [
      { heading: 'Normas de conduto (estática jurídica)', body: 'Determinam comportamentos (permitir, proibir, obrigar) e vinculam a expectativa de conduta dos indivíduos a uma consequência jurídica (sanção), definindo o conteúdo específico de um dever jurídico.' },
      { heading: 'Tipos de normas primárias', body: '• Que obrigam: algo deve ser feito (CF, art. 5º, LXXV — dever de indenizar por erro judiciário).\n• Que proíbem: algo não deve ser feito (CC, art. 58).\n• Que permitem: sentido fraco (nem proibido nem obrigatório) ou forte (faculdade garantida pelo Estado contra terceiros — CF, art. 5º, IX, liberdade de expressão intelectual).\n• Omissão/obrigação de omitir (CC, art. 888).\n• De competência: atribuem poder a órgão/pessoa para produzir atos normativos (poder-dever) — CF, art. 90 (Conselho da República).\n• Constitutivas (Searle, Rawls): atribuem valor jurídico a uma situação de fato ("X tem valor V no contexto C") — CC, art. 53.\n• Programáticas/de finalidade: tarefas e objetivos do Estado — CF, art. 3º (objetivos fundamentais da República).' },
      { heading: 'Normas de estrutura (dinâmica jurídica)', body: 'Referem-se à produção e à aplicação de outras normas, garantindo que as normas de conduta sejam concretizadas. Conferem poder (competência) e estabelecem meios e fins (procedimentos). Dividem-se em: identificação do sistema (fontes, validade, interpretação) e constitutivas das sanções e da produção.' },
      { heading: 'Tipos de normas secundárias', body: '• De modificação: alteram o conjunto normativo (CC, art. 67).\n• Sobre interpretação: atribuem sentido a um texto com roteiro técnico-interpretativo (CC, art. 113).\n• Interpretativas: orientam a construção linguística do legislador (LC 95/1998, art. 11).\n• Que estabelecem sanção: consequência para o descumprimento (CC, art. 1.337).\n• Sobre eliminação de normas: nulidades (não confundir com revogação) — CC, art. 54.\n• Sobre aplicação de normas: pressupõem interpretação prévia; dividem-se em pessoa, espaço e tempo (CP, art. 3).\n• Sobre fontes: atos/fatos que conferem poder de produzir normas (CC, art. 4 — analogia, costumes, princípios gerais).\n• Sobre produção de normas: quem produz, o quê, como e com quais objetivos (CF, art. 60).\n• Regras de competência: novas autoridades normativas (LGPD, art. 55-A — criação da ANPD).\n• Regras de exercício: exercício procedimental e limites da competência (CF, art. 60).' },
      { heading: 'Normas imperativas de 2ª instância (Bobbio)', body: 'Classificação de como o constituinte pode tratar a atuação do legislador ordinário:\n• Mandam ordenar: a CF ordena que regule a matéria (art. 5º, XXXII).\n• Proíbem ordenar: veda ato normativo sobre a matéria (art. 5º, XX).\n• Permitem ordenar: o constituinte não interfere (art. 22, parágrafo único).\n• Mandam proibir/proíbem permitir: obriga o legislador a vedar (art. 5º, XXXVI).\n• Proíbem proibir/mandam permitir: veda restringir direito garantido (art. 5º, XXXV).\n• Permitem proibir: permite restringir/regulamentar (art. 37, VII — greve).\n• Permitem permitir: permissão constitucional nova a situação antes proibida (art. 225, §7º).' },
    ],
  },
  {
    subject: 'kelsen',
    quick: [
      'Interpretar = operação mental que acompanha a aplicação do Direito (escalão superior → inferior).',
      'Ocorre em todos os níveis: leis, Constituição, tratados, normas individuais, sentenças, negócios jurídicos.',
      'Também o cidadão que apenas observa o Direito interpreta as normas.',
      'Autêntica: órgão competente, cria norma vinculante. Não-autêntica: doutrina, só valor cognoscitivo.',
    ],
    detailed: [
      { heading: 'A essência da interpretação', body: 'Para Kelsen, sempre que um órgão jurídico aplica o Direito, precisa antes fixar o sentido da norma que vai aplicar — ou seja, interpretá-la. É uma operação mental no percurso de um escalão superior para um inferior (da norma geral para a norma individual).' },
      { heading: 'Onde ocorre a interpretação', body: 'Não é só na lei/sentença: há interpretação da Constituição (quando o Legislativo edita leis ou decretos), de tratados internacionais e do direito internacional consuetudinário (quando aplicados por governos, tribunais ou órgãos administrativos), e também de normas individuais, sentenças, ordens administrativas e negócios jurídicos.' },
      { heading: 'Quem interpreta', body: 'Além dos órgãos que aplicam o Direito, os indivíduos que apenas o observam — cumprindo condutas que evitam a sanção — precisam compreender e, portanto, interpretar o sentido das normas que os vinculam.' },
      { heading: 'Interpretação autêntica × não-autêntica', body: 'AUTÊNTICA: feita por órgão jurídico competente no ato de aplicação do Direito; produz uma norma nova e vinculante.\nNÃO-AUTÊNTICA: realizada por quem não tem esse poder (ex.: a doutrina); tem valor cognoscitivo, mas não cria norma jurídica.' },
    ],
  },
  {
    subject: 'guastini',
    quick: [
      'Dois modelos de análise de decisões judiciais: deontológico/normativo × consequencialista/pragmático.',
      'Origem: classificação das doutrinas MORAIS.',
      'Normativo: conformidade com normas e princípios do sistema.',
      'Pragmático: consequências práticas (sociais, econômicas, institucionais).',
    ],
    detailed: [
      { heading: 'Os dois modelos', body: 'Guastini observa que, na literatura contemporânea (dogmática e teoria geral), existem dois modos de analisar e discutir as decisões judiciais: o modelo deontológico/normativo e o consequencialista/pragmático.' },
      { heading: 'Origem da dicotomia', body: 'A distinção é emprestada das doutrinas morais: deontológicas são as que fazem depender o caráter moral (justo/injusto) de uma ação da sua conformidade com uma norma ou princípio; consequencialistas, as que o fazem depender da soma das suas consequências.' },
      { heading: 'Aplicação às sentenças', body: 'Modelo NORMATIVO: julga a decisão pela sua conformidade com as normas e princípios do sistema jurídico. Modelo PRAGMÁTICO: julga a decisão pelas suas consequências práticas — sociais, econômicas e institucionais.' },
      { heading: 'Extensão à doutrina', body: 'A mesma dicotomia pode ser aplicada aos modos de análise da doutrina, não apenas das sentenças propriamente ditas.' },
    ],
  },
  {
    subject: 'desacato',
    quick: [
      'Autos 0067370-64.2012.8.24.0023 — Comarca de Florianópolis/SC — Juiz Alexandre Morais da Rosa (2015).',
      'Técnica: CONTROLE DE CONVENCIONALIDADE (tratados de DH como parâmetro).',
      'RE 466.343: tratados de DH sem rito do art. 5º, §3º = status SUPRALEGAL.',
      'CIDH, item 11: leis de desacato violam a liberdade de expressão (art. 13 CADH).',
      'Resultado: absolvido do desacato E da resistência.',
    ],
    detailed: [
      { heading: 'Fatos', body: 'O Ministério Público denunciou A.S. dos S.F. pelos crimes de desacato (art. 331, CP) e resistência (art. 329, CP). Durante abordagem policial, o acusado teria ofendido verbalmente os policiais e, ao ser informado da prisão pelo desacato, tentou fugir e resistiu à prisão.' },
      { heading: 'Controle de convencionalidade', body: 'Além da Constituição (controle de constitucionalidade), o julgador deve usar como parâmetro os tratados internacionais de Direitos Humanos, que formam o "bloco de constitucionalidade" (CF/88, art. 5º, §§2º e 3º).' },
      { heading: 'Status dos tratados — RE 466.343 (STF)', body: 'Precedente do Min. Gilmar Mendes: tratados de Direitos Humanos não aprovados pelo rito do art. 5º, §3º, têm caráter supralegal — abaixo da Constituição, mas acima da legislação ordinária, tornando inaplicável a lei interna que os contrarie.' },
      { heading: 'Fundamento convencional do desacato', body: 'A Declaração de Princípios sobre a Liberdade de Expressão da Comissão Interamericana de Direitos Humanos (2000), item 11, estabelece que as leis que punem a expressão ofensiva contra funcionários públicos ("leis de desacato") atentam contra a liberdade de expressão e o direito à informação — contrariando o art. 13 da Convenção Americana de Direitos Humanos (Pacto de San José). Somam-se os princípios da fragmentariedade e da intervenção mínima do Direito Penal, e precedentes de cortes de Honduras e da Guatemala que declararam inconstitucionais seus tipos de desacato.' },
      { heading: 'A absolvição da resistência', body: 'O juiz aplicou o sistema processual acusatório (Ferrajoli, Binder): como o próprio Ministério Público pediu a absolvição desse crime, o juiz não pode condenar — sob pena de fraude ao sistema acusatório e violação da separação entre acusação e julgamento.' },
      { heading: 'Decisão', body: 'Denúncia julgada improcedente; acusado absolvido das imputações dos arts. 331 (desacato) e 329 (resistência) do CP, com base no art. 386, III e VII, do CPP.' },
    ],
  },
  {
    subject: 'adi6457',
    quick: [
      'STF, Tribunal Pleno — Rel. Min. Luiz Fux — julgamento em 09/04/2024. Ação proposta pelo PDT.',
      'Tese central: NÃO existe "poder moderador" militar — a CF/88 adotou a tripartição de poderes.',
      'Chefia das FA pelo Presidente: poder LIMITADO.',
      'Emprego das FA: só pelo Presidente (iniciativa própria) ou a pedido dos presidentes do STF, Senado ou Câmara — NUNCA de um Poder contra outro.',
      'GLO: subsidiária e excepcional, após esgotados os meios ordinários, sob controle dos demais Poderes.',
      'Resultado: parcialmente procedente, com interpretação conforme à Constituição.',
    ],
    detailed: [
      { heading: 'Objeto', body: 'Ação Direta de Inconstitucionalidade, proposta pelo PDT, questionando o art. 142 da Constituição Federal e os arts. 1º, caput, e 15, caput e §§1º a 3º, da LC 97/1999, que tratam das atribuições das Forças Armadas — em especial a ideia de que elas exerceriam um "poder moderador" entre os Poderes Executivo, Legislativo e Judiciário (à semelhança do que previa a Constituição Imperial de 1824).' },
      { heading: 'Tese 1 — Missão institucional', body: 'A missão institucional das Forças Armadas (defesa da Pátria, garantia dos poderes constitucionais e garantia da lei e da ordem) não comporta o exercício de poder moderador entre os Poderes.' },
      { heading: 'Tese 2 — Chefia presidencial', body: 'A chefia das Forças Armadas pelo Presidente da República é um poder limitado: não pode ser usada para intromissão indevida no funcionamento independente dos demais Poderes.' },
      { heading: 'Tese 3 — Quem autoriza o emprego', body: 'O emprego das Forças Armadas só pode ser autorizado pelo Presidente, por iniciativa própria ou a pedido dos presidentes do STF, do Senado ou da Câmara — e nunca pode ser usado por um Poder contra outro.' },
      { heading: 'Tese 4 — Garantia da Lei e da Ordem (GLO)', body: 'O emprego para "garantia da lei e da ordem" é medida subsidiária e excepcional, cabível após esgotados os mecanismos ordinários, diante de grave e concreta violação à segurança pública, sob controle permanente dos demais Poderes.' },
      { heading: 'Decisão', body: 'Por unanimidade, o Tribunal converteu a medida cautelar referendada em julgamento de mérito e julgou a ação parcialmente procedente, conferindo interpretação conforme a Constituição aos dispositivos impugnados da LC 97/1999. Vários ministros acompanharam o relator com ressalvas.' },
    ],
  },
];

// Texto integral do PDF, usado como contexto nas chamadas de IA.
const PDF_CONTEXT = `
GUIA DE ESTUDOS — 1o GQ — Teoria/Filosofia do Direito (Prof. Manoel Uchôa / Monitora Carolina Braga).

1) TIPOS DE NORMAS JURÍDICAS — Duas grandes categorias: normas de conduta (estática jurídica) e normas de estrutura (dinâmica jurídica). Normas de conduta determinam comportamentos (permitir, proibir, obrigar) e vinculam a expectativa de conduta a uma consecuência jurídica (sanção). Normas de estrutura referem-se à produção e aplicação de outras normas, conferem poder (competência) e estabelecem meios e fins (procedimentos).
Normas primárias: obrigam (CF 5º LXXV); proíbem (CC 58); permitem (fraco/forte — CF 5º IX); omissão (CC 888); de competência (CF 90); constitutivas — Searle/Rawls, "X tem valor V no contexto C" (CC 53); programáticas/de finalidade (CF 3º).
Normas secundárias: modificação (CC 67); sobre interpretação (CC 113); interpretativas (LC 95 art. 11); que estabelecem sanção (CC 1.337); sobre eliminação de normas — nulidades, não revogação (CC 54); sobre aplicação — pessoa, espaço e tempo (CP 3); sobre fontes (CC 4); sobre produção de normas (CF 60); regras de competência (LGPD 55-A cria ANPD); regras de exercício (CF 60).
BOBBIO — normas imperativas de 2ª instância: mandam ordenar (CF 5º XXXII); proíbem ordenar (CF 5º XX); permitem ordenar (CF 22 parágrafo único); mandam proibir/proíbem permitir (CF 5º XXXVI); proíbem proibir/mandam permitir (CF 5º XXXV); permitem proibir (CF 37 VII greve); permitem permitir (CF 225 §7º).

2) A INTERPRETAÇÃO — HANS KELSEN (Teoria Pura do Direito, cap. VIII): interpretar é operação mental que acompanha a aplicação do Direito de um escalão superior para um inferior (norma geral → norma individual). Ocorre em todos os níveis: leis, Constituição, tratados, direito internacional consuetudinário, normas individuais, sentenças, ordens administrativas, negócios jurídicos. Também indivíduos que apenas observam o Direito interpretam. Interpretação autêntica: por órgão jurídico competente, produz norma nova e vinculante. Interpretação não-autêntica: ex. doutrina, valor cognoscitivo, não cria norma.

3) DOIS MODELOS DE ANÁLISE DA SENTENÇA — RICCARDO GUASTINI: modelo deontológico/normativo (sentença julgada pela conformidade com normas e princípios do sistema) x consequencialista/pragmático (sentença julgada pelas consequências práticas: sociais, econômicas, institucionais). Dicotomia emprestada das doutrinas morais; aplicável também à análise da doutrina.

4) CASO 1 — DESACATO (controle de convencionalidade): autos 0067370-64.2012.8.24.0023, Comarca de Florianópolis/SC, Juiz Alexandre Morais da Rosa (2015). Denunciado por desacato (art. 331 CP) e resistência (art. 329 CP). Controle de convencionalidade: tratados de DH como parâmetro (bloco de constitucionalidade, CF art. 5º §§2º e 3º). STF RE 466.343 (Min. Gilmar Mendes): tratados de DH sem rito do art. 5º §3º têm status supralegal (abaixo da CF, acima da lei; lei interna contrária fica inaplicável). Declaração de Princípios sobre Liberdade de Expressão da CIDH (2000), item 11: leis de desacato atentam contra liberdade de expressão e direito à informação, contrariando art. 13 da CADH (Pacto de San José). Princípios da fragmentariedade e intervenção mínima do Direito Penal; precedentes de Honduras e Guatemala. Resistência: absolvida porque o próprio MP pediu absolvição — sistema acusatório (Ferrajoli, Binder). Decisão: denúncia improcedente, absolvição com base no art. 386, III e VII, CPP.

5) ADI 6457 — FORÇAS ARMADAS E SEPARAÇÃO DE PODERES: STF, Tribunal Pleno, Rel. Min. Luiz Fux, julgamento 09/04/2024, ação do PDT contra art. 142 CF e arts. 1º e 15 da LC 97/1999. Teses: a missão institucional das FA (defesa da Pátria, garantia dos poderes constitucionais e garantia da lei e da ordem) NÃO comporta poder moderador; a CF/88 adotou a tripartição de poderes (sem poder moderador como no Império de 1824); chefia das FA pelo Presidente é poder limitado; emprego das FA só autorizado pelo Presidente (iniciativa própria) ou a pedido dos presidentes do STF, Senado ou Câmara — nunca de um Poder contra outro; GLO é medida subsidiária e excepcional, após esgotados os mecanismos ordinários, diante de grave e concreta violação à segurança pública, sob controle permanente dos demais Poderes. Decisão: unânime, parcialmente procedente, interpretação conforme à Constituição da LC 97/1999.
`;

module.exports = { SUBJECTS, MCQ, VF, OPEN, SUMMARIES, PDF_CONTEXT };
