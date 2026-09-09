// Data store for the Virtual Military Museum Tour

export const MUSEUM_LOCATIONS = [
  {
    id: 'pos-entrada',
    name: '1. Vista General / Entrada',
    shortName: 'Entrada',
    description: 'Vista panorámica general al ingresar a la Sala Principal del Museo.',
    cameraPos: { x: 0, y: 1.6, z: 5.5 },
    targetPos: { x: 0, y: 1.6, z: -5 },
    arrows: [
      { targetId: 'pos-izquierda', label: 'Ver Pared Izquierda (Tablets y Cuadros)', x: -2.5, z: 2, angle: -Math.PI / 3 },
      { targetId: 'pos-frontal', label: 'Ver Pared Frontal (Nuestra Historia, Nuestro Ejército)', x: 0, z: 0.5, angle: 0 },
      { targetId: 'pos-derecha', label: 'Ver Pared Derecha (Campañas y Héroes)', x: 2.5, z: 2, angle: Math.PI / 3 },
      { targetId: 'pos-centro', label: 'Ver Mueble Central (Cartas y Libros Antiguos)', x: 0, z: 3, angle: 0 }
    ]
  },
  {
    id: 'pos-izquierda',
    name: '2. Pared Izquierda (Tablets y Cuadros)',
    shortName: 'Pared Izquierda',
    description: 'Exhibición interactiva con tablets táctiles y cuadros históricos sobre las reformas militares y la emancipación.',
    cameraPos: { x: -4.5, y: 1.6, z: 1.5 },
    targetPos: { x: -6.5, y: 1.6, z: 1.5 },
    arrows: [
      { targetId: 'pos-entrada', label: 'Volver a la Entrada', x: -2.5, z: 3.5, angle: Math.PI / 2 },
      { targetId: 'pos-frontal', label: 'Avanzar a Pared Frontal', x: -3.5, z: -1.5, angle: -Math.PI / 4 },
      { targetId: 'pos-centro', label: 'Ir al Mueble Central', x: -2, z: 1.5, angle: Math.PI / 4 }
    ]
  },
  {
    id: 'pos-frontal',
    name: '3. Pared Frontal (Nuestra Historia, Nuestro Ejército)',
    shortName: 'Pared Frontal',
    description: 'Mural arquitectónico principal con 4 pantallas táctiles interactiva y el Escudo retroiluminado del Ejército del Perú.',
    cameraPos: { x: 0, y: 1.6, z: -2.5 },
    targetPos: { x: 0, y: 1.6, z: -6.5 },
    arrows: [
      { targetId: 'pos-izquierda', label: 'Ir a Pared Izquierda', x: -2.5, z: -2.5, angle: -Math.PI / 2 },
      { targetId: 'pos-derecha', label: 'Ir a Pared Derecha', x: 2.5, z: -2.5, angle: Math.PI / 2 },
      { targetId: 'pos-centro', label: 'Acercarse al Mueble Central', x: 0, z: -0.5, angle: Math.PI }
    ]
  },
  {
    id: 'pos-derecha',
    name: '4. Pared Derecha (Campañas y Héroes Patrios)',
    shortName: 'Pared Derecha',
    description: 'Galería de tablets táctiles y cuadros dedicados a la Campaña de la Breña y la Victoria del Cenepa.',
    cameraPos: { x: 4.5, y: 1.6, z: 1.5 },
    targetPos: { x: 6.5, y: 1.6, z: 1.5 },
    arrows: [
      { targetId: 'pos-frontal', label: 'Ir a Pared Frontal', x: 3.5, z: -1.5, angle: -3 * Math.PI / 4 },
      { targetId: 'pos-entrada', label: 'Volver a la Entrada', x: 2.5, z: 3.5, angle: -Math.PI / 2 },
      { targetId: 'pos-centro', label: 'Ir al Mueble Central', x: 2, z: 1.5, angle: -Math.PI / 4 }
    ]
  },
  {
    id: 'pos-centro',
    name: '5. Mueble Exhibidor Central (Cartas y Libros Antiguos)',
    shortName: 'Mueble Central',
    description: 'Mueble vitrina central con cartas manuscritas originales en la parte superior y libros antiguos militares en la parte inferior.',
    cameraPos: { x: 0, y: 1.6, z: 1.2 },
    targetPos: { x: 0, y: 0.9, z: 0 },
    arrows: [
      { targetId: 'pos-entrada', label: 'Vista General de Entrada', x: 0, z: 3, angle: Math.PI },
      { targetId: 'pos-frontal', label: 'Mirar Pared Frontal', x: 0, z: -1.5, angle: 0 },
      { targetId: 'pos-izquierda', label: 'Mirar Pared Izquierda', x: -2, z: 0.5, angle: -Math.PI / 2 },
      { targetId: 'pos-derecha', label: 'Mirar Pared Derecha', x: 2, z: 0.5, angle: Math.PI / 2 }
    ]
  }
];

export const FRONT_SCREENS = [
  {
    id: 'screen-1',
    title: 'Historia del Ejército del Perú',
    subtitle: 'Cronología y origen heroico de nuestras fuerzas armadas',
    wallIndex: 0,
    icon: '📜',
    content: {
      summary: 'El Ejército del Perú hunde sus raíces en la rica tradición guerrera de las civilizaciones prehispánicas y el Imperio del Tahuantinsuyo, consolidándose formalmente en el proceso emancipador de la Independencia.',
      sections: [
        {
          heading: '1. Orígenes y Época Incaica',
          text: 'Las huestes del Tahuantinsuyo desarrollaron una rígida disciplina y estrategia de organización militar. Los ejércitos incaicos defendían las fronteras del imperio y edificaron monumentales fortalezas como Sacsayhuamán y Ollantaytambo.'
        },
        {
          heading: '2. Gestas Emancipadoras y Nacimiento Republicano (1821-1824)',
          text: 'Bajo la conducción de Don José de San Martín y el Libertador Simón Bolívar, tropas peruanas y patriotas sellaron la independencia del Perú y América del Sur en las gloriosas batallas de Junín (6 de agosto de 1824) y Ayacucho (9 de diciembre de 1824).'
        },
        {
          heading: '3. Siglo XIX y Defensores del Honor Nacional',
          text: 'Durante la Guerra del Pacífico (1879-1883), héroes inmortales como el Gran Mariscal Francisco Bolognesi y el Capitán Alfonso Ugarte inmolaron sus vidas en Arica, mientras el Mariscal Andrés Avelino Cáceres lideró la indomable Campaña de la Breña en la sierra central.'
        },
        {
          heading: '4. El Ejército Moderno del Siglo XXI',
          text: 'Hoy, el Ejército del Perú combina profesionalismo, tecnología de punta, misión de defensa de la soberanía y una vocación permanente de auxilio y apoyo al desarrollo socioeconómico de la patria.'
        }
      ]
    }
  },
  {
    id: 'screen-2',
    title: 'Armas y Servicios del Ejército',
    subtitle: 'Especialidades operativas y logísticas militares',
    wallIndex: 1,
    icon: '🛡️',
    content: {
      summary: 'El Ejército del Perú está integrado por Armas Combatientes y Servicios Logísticos highly especializados que garantizan la eficacia operativa y la defensa integral del territorio nacional.',
      sections: [
        {
          heading: 'Infantería — "La Reina de las Armas"',
          text: 'Columna vertebral del combate terrestre. Su divisa heroica rinde homenaje al Mariscal Francisco Bolognesi. Motto: "¡Hasta quemar el último cartucho!"'
        },
        {
          heading: 'Caballería — "La Fuerza Veloz y Bravo"',
          text: 'Inspirada en los Húsares de Junín. Destacada por su maniobrabilidad, exploración táctica y unidades blindadas mecanizadas.'
        },
        {
          heading: 'Artillería — "La Gran Armada Ruidosa"',
          text: 'Potencia de fuego estratégico y apoyo aéreo-terrestre. Patronato: Coronel José Joaquín Inclán. Proporciona fuego de cobertura a larga distancia.'
        },
        {
          heading: 'Ingeniería Militar — "Construcción y Combate"',
          text: 'Apertura de vías, puentes tácticos, minado/desminado y apoyo decisivo en emergencias climáticas y desastres naturales.'
        },
        {
          heading: 'Comunicaciones e Inteligencia',
          text: 'Redes seguras de mando, ciberdefensa, guerra electrónica y procesamiento de información táctica estratégica.'
        },
        {
          heading: 'Servicios Logísticos (Intendencia, Material de Guerra, Sanidad, Aviación)',
          text: 'Aprovisionamiento, mantenimiento de material bélico, evacuación médica aero-transportada y transporte táctico aéreo.'
        }
      ]
    }
  },
  {
    id: 'screen-3',
    title: 'Divisiones y Brigadas del Ejército',
    subtitle: 'Organización territorial y cobertura estratégica nacional',
    wallIndex: 2,
    icon: '🗺️',
    content: {
      summary: 'El territorio nacional se divide en 5 Divisiones de Ejército estratégicas estructuradas para resguardar las fronteras marítimas, terrestres y amazónicas, además de afrontar emergencias.',
      sections: [
        {
          heading: 'I División de Ejército (Piura — Región Norte)',
          text: 'Resguarda la frontera norte del país con brigadas blindadas, de infantería y de caballería capacitadas para alta movilidad geográfica.'
        },
        {
          heading: 'II División de Ejército (Rímac/Lima — Región Centro)',
          text: 'Garantiza la seguridad en el corazón geopolítico del Perú y comanda la célebre 1ª Brigada de Fuerzas Especiales.'
        },
        {
          heading: 'III División de Ejército (Arequipa — Región Sur)',
          text: 'Vigila las mesetas andinas y fronteras sur del territorio peruano con brigadas de montaña altamente adiestradas.'
        },
        {
          heading: 'IV División de Ejército (Pichari — VRAEM)',
          text: 'Fuerza operativa combativa enfocada en la pacificación y eliminación de remanentes terroristas y narcotráfico en el VRAEM.'
        },
        {
          heading: 'V División de Ejército (Iquitos — Región Amazonía)',
          text: 'Protección de la vasta frontera fluvial amazónica, operaciones de selva e integración de comunidades nativas lejanas.'
        }
      ]
    }
  },
  {
    id: 'screen-4',
    title: 'La Victoria de las Fuerzas Armadas y el Pueblo',
    subtitle: 'Héroes nacionales, pacificación y paz soberana',
    wallIndex: 3,
    icon: '🏆',
    content: {
      summary: 'Tributo imperecedero a los valientes soldados y ciudadanos que defendieron la integridad de la nación en momentos cruciales de nuestra historia republicana.',
      sections: [
        {
          heading: 'El Sacrificio Inmortal de Arica (1880)',
          text: 'El Coronel Francisco Bolognesi y su consejo de oficiales respondieron con la célebre frase: "Tengo deberes sagrados que cumplir y los cumpliré hasta quemar el último cartucho", prefiriendo la gloria del deber antes que rendir la plaza.'
        },
        {
          heading: 'La Gesta Histórica del Cenepa (1995)',
          text: 'Combate heroico en las selvas de Tiwinza y Base Sur que consolidó la delimitación definitiva de las fronteras pacíficas y hermandad peruano-ecuatoriana.'
        },
        {
          heading: 'Operación Chavín de Huántar (1997)',
          text: 'Considerada mundialmente como una de las operaciones de rescate de rehenes más exitosas y arriesgadas de la historia militar militar de comandos.'
        },
        {
          heading: 'Unión del Ejército y la Sociedad Civil',
          text: 'El Ejército Peruano como actor permanente en el desarrollo socioeconómico, asistencia en desastres por el Fenómeno del Niño y misiones internacionales de mantenimiento de la paz de la ONU.'
        }
      ]
    }
  }
];

export const LEFT_TABLETS = [
  {
    id: 'tab-l1',
    title: 'Ramón Castilla y el Estado Mayor',
    type: 'tablet',
    icon: '📱',
    summary: 'El Gran Mariscal Ramón Castilla organizó el Ejército Peruano profesional en el siglo XIX.',
    details: 'Bajo la presidencia de Ramón Castilla se promulgó la Ley de Organización Militar, la adquisición de armamento de última tecnología y la creación de academias superiores de estrategia bélica.'
  },
  {
    id: 'cuadro-l1',
    title: 'Cuadro Histórico: Batalla de Ayacucho (1824)',
    type: 'cuadro',
    icon: '🖼️',
    summary: 'Óleo sobre lienzo que retrata el choque decisivo de la Pampa de la Quinua.',
    details: 'El 9 de diciembre de 1824, el Ejército Unido Libertador comandado por el General Antonio José de Sucre venció a las tropas virreinales, sellando la independencia política de toda América del Sur.'
  },
  {
    id: 'tab-l2',
    title: 'Símbolos e Uniformidad Histórica',
    type: 'tablet',
    icon: '📱',
    summary: 'Exhibición táctil de los uniformes históricos desde la Guerra de la Independencia.',
    details: 'Muestra interactiva en 3D que permite examinar los gorros de morrión, los capotes de paño azul de los Húsares y las insignias de grado del Ejército Republicano.'
  }
];

export const RIGHT_TABLETS = [
  {
    id: 'tab-r1',
    title: 'Campaña de la Breña (1881-1883)',
    type: 'tablet',
    icon: '📱',
    summary: 'La legendaria resistencia comandada por el Mariscal Andrés Avelino Cáceres.',
    details: 'Apodado "El Brujo de los Andes" por su extraordinaria táctica de movilidad militar, Cáceres organizó a campesinos y soldados en la sierra central logrando victorias gloriosas en Sangrar, Pucará, Marcavalle y Concepción.'
  },
  {
    id: 'cuadro-r1',
    title: 'Cuadro Histórico: La Respuesta de Arica',
    type: 'cuadro',
    icon: '🖼️',
    summary: 'Representación artística de la reunión del Coronel Francisco Bolognesi con sus oficiales.',
    details: 'Obra alegórica que capta la firme determinación de la junta de guerra frente al emisario de rendición en mayo de 1880 en la morada del Estado Mayor de Arica.'
  },
  {
    id: 'tab-r2',
    title: 'Victoria del Alto Cenepa (1995)',
    type: 'tablet',
    icon: '📱',
    summary: 'Conflicto armado en la cordillera del Cóndor y proceso de pacificación defensiva.',
    details: 'Las patrullas de las Fuerzas Especiales del Ejército defendieron la soberanía nacional en la densa selva amazónica, conduciendo a la firma del Tratado de Paz Definitivo en Brasilia en 1998.'
  }
];

export const CENTRAL_EXHIBIT = {
  id: 'mueble-central',
  title: 'Mueble Exhibidor de Documentos y Reliquias Históricas',
  description: 'Mueble vitrina central con cartas manuscritas originales en la parte superior y tomos antiguos militares en el estante inferior.',
  lettersTop: [
    {
      id: 'carta-1',
      title: 'Carta Manuscrita de Francisco Bolognesi a su Esposa',
      date: 'Arica, 8 de mayo de 1880',
      author: 'Coronel Francisco Bolognesi Cervantes',
      recipient: 'María Josefa La Puente y Rivero',
      icon: '✉️',
      summary: 'Famosa misiva íntima y patriótica enviada semanas antes de la Batalla de Arica.',
      transcript: `"Mi adorada María Josefa:
Te escribo con el pensamiento puesto en ti y en la sagrada causa de nuestra patria. Aquí las noticias son graves, pero el ánimo de esta guarnición se mantiene invencible.
Que no te quepa duda de que defenderé este puesto hasta el límite de mi deber. Si me toca rendir la vida, sé que recordarás que muero con honor. Abraza a mis hijos con todo mi amor.
Tu esposo que te ama, Francisco."`,
      details: 'El documento original conserva la caligrafía autógrafa en tinta ferrogálica sobre papel de época, resguardado bajo cristal UV.'
    },
    {
      id: 'carta-2',
      title: 'Parte de Guerra del Mariscal Andrés Avelino Cáceres',
      date: 'Campamento en Chicla, 14 de Febrero de 1882',
      author: 'General Andrés Avelino Cáceres',
      recipient: 'Estado Mayor de la Resistencia',
      icon: '✉️',
      summary: 'Manuscrito militar detallando las tácticas de marcha y guerrilla en la Sierra Central.',
      transcript: `"Al Señor Jefe del Estado Mayor General:
Hago saber que las fuerzas combinadas de la Breña han sorprendido a la columna avanzada en los desfiladeros de Pucará. La moral del soldado peruano no cede ante la escasez. Continuaremos la marcha hacia las alturas para interceptar la línea de suministros enemiga."`,
      details: 'Carta militar con sellos oficiales de la época y firmas de autenticidad en lacre rojo.'
    },
    {
      id: 'carta-3',
      title: 'Proclama de Emancipación y Oficio de San Martín',
      date: 'Cuartel General de Lima, Julio de 1821',
      author: 'Generalísimo Don José de San Martín',
      recipient: 'Cuerpo de Oficiales del Ejército Libertador',
      icon: '✉️',
      summary: 'Instrucciones para la jura solemnísima de la Independencia del Perú.',
      transcript: `"Soldados de la Libertad:
El Perú es desde este momento libre e independiente por la voluntad general de los pueblos y por la justicia de su causa que Dios defiende. ¡Viva la Patria, Viva la Libertad, Viva la Independencia!"`,
      details: 'Manuscrito fundacional restaurado con tinta dorada y sellos de agua historiográficos.'
    }
  ],
  booksBottom: [
    {
      id: 'libro-1',
      title: 'Táctica de Infantería del Ejército Peruano (Edición 1879)',
      year: '1879',
      author: 'Ministerio de Guerra y Marina del Perú',
      icon: '📚',
      summary: 'Manual original de orden cerrado, despliegue de escaramuzas y tiro balístico.',
      contents: 'Contiene 340 páginas con diagramas desplegables litografiados sobre movimientos de batallón, formación en cuadro y toques de corneta reglamentarios.',
      details: 'Encuadernación artesanal en cuero tafilete con letras grabadas en pan de oro de 24k.'
    },
    {
      id: 'libro-2',
      title: 'Diario de Campaña y Croquis Topográficos (1880-1883)',
      year: '1883',
      author: 'Comandancia General del Ejército de Operaciones',
      icon: '📚',
      summary: 'Bitácora manuscrita de marcha, partes meteorológicos y mapas de batallas.',
      contents: 'Registro detallado del aprovisionamiento de viveres, estado de la munición y cartas de navegación terrestre por las cordilleras andinas.',
      details: 'Volumen encuadernado en piel de lomo cosido a mano con tintas vegetales.'
    },
    {
      id: 'libro-3',
      title: 'Código de Honor Militar y Reglamento Orgánico (1864)',
      year: '1864',
      author: 'Congreso Mariscal de la República',
      icon: '📚',
      summary: 'Base jurídica e ideológica del servicio a la patria y disciplina del soldado peruano.',
      contents: 'Estatuto sobre las virtudes del servidor de la patria: valor, lealtad, obediencia heroica, justicia y abnegación.',
      details: 'Libro impreso en la Imprenta del Estado Peruano en Lima.'
    }
  ]
};

export const PRESENTATION_DATA = {
  title: 'PRESENTACIÓN',
  subtitle: 'Museo Virtual del Ejército del Perú',
  audioUrl: null,
  text: `El Museo del Ejército es el espacio de memoria, educación e historia del Perú destinado a conmemorar las gestas heroicas de nuestras fuerzas armadas y rendir permanente tributo a los defensores de la soberanía nacional.

En esta muestra permanente, el visitante podrá recorrer la rica trayectoria militar que hermana al Ejército con la sociedad civil peruana: desde los orígenes del Tahuantinsuyo y las gloriosas batallas de la Emancipación en Junín y Ayacucho, pasando por el sacrificio inmortal del Gran Mariscal Francisco Bolognesi en Arica y la epopeya de la Breña con Andrés Avelino Cáceres, hasta la victoria del Alto Cenepa y las operaciones contemporáneas de pacificación y auxilio a la población.

Le invitamos a explorar las 4 pantallas interactivas de la pared frontal, examinar los cuadros y tablets históricas en los muros laterales, y admirar en el mueble vitrina central las cartas manuscritas originales y libros antiguos de nuestra rica herencia patriótica.`
};
