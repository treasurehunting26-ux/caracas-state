/* Caracas Luxury Estate · i18n module
   EN / ES / DE — persists choice via localStorage and updates <html lang>. */

const I18N = {
  en: {
    /* nav */
    'nav.overview': 'Overview',
    'nav.security': 'Security',
    'nav.amenities': 'Amenities',
    'nav.location': 'Location',
    'nav.cta': 'Private Showing',

    /* hero */
    'hero.eyebrow': 'Exclusive Private Listing · Caracas, Venezuela',
    'hero.h1.line1': 'Absolute Privacy.',
    'hero.h1.line2': 'Total Autonomy.',
    'hero.h1.line3': 'Unrivaled Security.',
    'hero.hook.html': 'In an era of global uncertainty, this <strong>self-sufficient sanctuary</strong> offers military-grade security, one month of full power and water independence, and the most prestigious view of the <strong>Ávila National Park</strong>. Welcome to the pinnacle of Venezuelan luxury.',
    'hero.btn.dossier': 'Download Investment Dossier',
    'hero.btn.explore': 'Explore the Estate',
    'hero.stat.estate': 'm² Estate',
    'hero.stat.built': 'm² Built',
    'hero.stat.bedrooms': 'Bedrooms',
    'hero.stat.bathrooms': 'Bathrooms',

    /* overview */
    'ov.label': 'The Estate',
    'ov.h2.line1': 'Redefining <em>Exclusive</em>',
    'ov.h2.line2': 'Residence in Venezuela',
    'ov.p1.html': 'This architectural masterpiece offers <strong>6,000m² of sophisticated living space</strong> set upon a sprawling 15,000m² private estate in the prestigious hills of Baruta — one of Caracas\'s most coveted and secure residential enclaves.',
    'ov.p2.html': 'Featuring dual access points via Lomas de Chispia and Sorocaima, the property ensures both absolute privacy and strategic mobility. Built in 2006 and sold fully furnished with high-end international pieces.',
    'ov.p3.html': 'Whether as a <strong>primary residence</strong>, a <strong>diplomatic headquarters</strong>, or an exclusive <strong>corporate retreat</strong> — this estate delivers a perfect fusion of opulence, technological independence, and 360-degree security.',
    'ov.price.label': 'Asking Price · By Appointment Only',
    'ov.price.note': 'Sold fully furnished · Qualified buyers only',
    'ov.fact.totalArea': 'Total Area',
    'ov.fact.builtArea': 'Built Area',
    'ov.fact.bedrooms': 'Bedrooms',
    'ov.fact.bedrooms.v': '12 Oversized',
    'ov.fact.bathrooms': 'Bathrooms',
    'ov.fact.bathrooms.v': '10 Designer',
    'ov.fact.year': 'Year Built',
    'ov.fact.parking': 'Parking',
    'ov.fact.parking.v': '10+ Spaces',
    'ov.fact.kitchens': 'Kitchens',
    'ov.fact.kitchens.v': '4 Gourmet',
    'ov.fact.furnishing': 'Furnishing',
    'ov.fact.furnishing.v': 'Fully Furnished',

    /* gallery */
    'gal.label': 'Gallery',
    'gal.h2.line1': 'Every Detail,',
    'gal.h2.line2': 'a Masterpiece',
    'gal.count': '60 curated photographs',
    'gal.note': 'High resolution · Available upon request',
    'gal.l.living': 'Double Height Living · Avila Views',
    'gal.l.library': 'Private Library · Stained Glass',
    'gal.l.spa': 'Spa Bathroom · Freestanding Tub',
    'gal.l.master': 'Master Suite · Cathedral Ceiling',
    'gal.l.exterior': 'Estate Exterior · Infinity Pool',
    'gal.btn': 'View Full Gallery →',

    /* video */
    'vid.label': 'Cinematic Tour',
    'vid.h2.line1': 'Experience It',
    'vid.h2.line2': 'in Motion',
    'vid.cap': 'Panoramic Views · Pool Terrace · Avila National Park',

    /* security teaser */
    'sec.label': 'Security & Autonomy',
    'sec.h2.line1': 'A Self-Sufficient',
    'sec.h2.line2': 'Sanctuary',
    'sec.c1.h': 'Armored Infrastructure',
    'sec.c1.p': 'Military-grade reinforced perimeter walls and ballistic doors engineered to the highest international protection standards.',
    'sec.c2.h': 'Full Power Independence',
    'sec.c2.p': '300 KVA diesel power plant providing up to 30 days of complete autonomy — independent from the public grid under any circumstance.',
    'sec.c3.h': 'Water Security',
    'sec.c3.p': 'Two reserve tanks totaling 1,000,000 litres of fresh water storage — complete independence from municipal supply.',
    'sec.c4.h': 'Strategic Access',
    'sec.c4.p': '500m of private internal roads, dual access points, and a designated private helipad for discreet, swift arrival and departure.',
    'sec.s1': 'Power Plant',
    'sec.s2': 'Water Reserve',
    'sec.s3': 'Private Roads',
    'sec.s4': 'Full Autonomy',
    'sec.s4.unit': 'days',
    'sec.btn': 'Full Security Details →',

    /* amenities teaser */
    'am.label': 'Amenities',
    'am.h2.line1': 'Your Private',
    'am.h2.line2': 'Country Club',
    'am.intro': 'Specialized spaces rarely found in private residences — this estate is an entertainment, wellness, and lifestyle powerhouse designed for the world\'s most discerning individuals.',
    'am.c1.cat': 'Living Quarters',
    'am.c1.h': 'Master Suite & Bedrooms',
    'am.c1.l1': '12 Oversized bedrooms',
    'am.c1.l2': '10 Designer bathrooms',
    'am.c1.l3': 'Walk-in closets & marble finishes',
    'am.c1.l4': 'Private Jacuzzis in principal suites',
    'am.c1.l5': 'Dedicated guest apartment',
    'am.c1.l6': 'Internal panoramic elevator',
    'am.c2.cat': 'Wellness & Entertainment',
    'am.c2.h': 'Private Club Facilities',
    'am.c2.l1': 'Professional gym & sauna',
    'am.c2.l2': 'Turkish bath / hammam',
    'am.c2.l3': 'Outdoor swimming pool',
    'am.c2.l4': 'State-of-the-art cinema room',
    'am.c2.l5': 'Game room',
    'am.c2.l6': 'Basketball / multipurpose court',
    'am.c3.cat': 'Unique Spaces',
    'am.c3.h': 'One-of-a-Kind Amenities',
    'am.c3.l1': 'Private chapel (50–100 guests)',
    'am.c3.l2': 'Dedicated hair salon',
    'am.c3.l3': 'Specialized shoe room',
    'am.c3.l4': 'Library / studio',
    'am.c3.l5': '4 Gourmet kitchens · Viking appliances',
    'am.c3.l6': 'Staff & driver quarters',
    'am.btn': 'View Full Amenities →',

    /* areas */
    'ar.1.n': 'Living Room',
    'ar.1.d': 'Double Height · Avila Views',
    'ar.2.n': 'Private Library',
    'ar.2.d': 'Stained Glass · Custom Shelving',
    'ar.3.n': 'Private Salon',
    'ar.3.d': 'Professional Spa · Marble Floors',
    'ar.4.n': 'Master Suite',
    'ar.4.d': 'Cathedral Ceiling · En Suite Spa',

    /* location */
    'loc.label': 'Location',
    'loc.h2.line1': 'The Most Coveted',
    'loc.h2.line2': '<em>View</em> in Venezuela',
    'loc.p1': 'Perched in the prestigious hills of Baruta, the estate commands a direct, unobstructed panoramic view of the majestic Ávila National Park — a natural landmark visible from across the property.',
    'loc.p2': 'La Trinidad offers the ideal balance between proximity to Caracas\'s commercial and diplomatic centers and the tranquility of an elevated, forested enclave with a naturally cooler micro-climate year-round.',
    'loc.tag1': 'Ávila National Park Views',
    'loc.tag2': 'La Trinidad · Baruta',
    'loc.tag3': 'Lomas de Chispia',
    'loc.tag4': 'Dual Access Points',
    'loc.tag5': 'Elevated Micro-Climate',
    'loc.tag6': 'Exclusive Enclave',
    'loc.btn': 'View Location Details →',
    'loc.map.cap': 'Direct Avila National Park Views',

    /* faq */
    'faq.label': 'FAQ',
    'faq.h2.line1': 'Common',
    'faq.h2.line2': 'Questions',
    'faq.q1': 'Where exactly is this luxury armored estate located?',
    'faq.a1': 'Lomas de Chispia / Sorocaima, La Trinidad, Baruta, Caracas — one of Venezuela\'s most exclusive and secure residential zones, with direct panoramic views of Ávila National Park. The exact address is provided only to verified qualified buyers.',
    'faq.q2': 'What is the asking price and what does it include?',
    'faq.a2': 'USD $10,000,000, sold fully furnished with curated high-end international pieces. Includes the 15,000m² estate, all structures, 300KVA power plant, water reserve infrastructure, and all fixed installations. Private showings by appointment only for qualified buyers.',
    'faq.q3': 'Is this property self-sufficient from public utilities?',
    'faq.a3': 'Yes, completely. A 300KVA diesel plant provides up to 30 days of uninterrupted power, while two reserve tanks deliver a combined 1,000,000 litres of stored water — total independence from municipal infrastructure under any circumstance.',
    'faq.q4': 'Is this estate suitable as diplomatic housing in Caracas?',
    'faq.a4': 'Yes. Military-grade security, full utility independence, private chapel, staff quarters, internal elevator, 4 gourmet kitchens, and 15,000m² grounds make this ideal as a diplomatic headquarters, corporate retreat, or high-net-worth primary residence.',
    'faq.q5': 'Does the estate have a helipad?',
    'faq.a5': 'Yes. The estate includes a designated private helipad space along with 500 metres of internal private roads and dual access points — providing maximum operational flexibility and discretion for arrivals and departures.',

    /* dossier */
    'dos.label': 'Investment Dossier',
    'dos.h2.line1': 'Download the Private',
    'dos.h2.line2': 'Investment Prospectus',
    'dos.intro': 'Reserved for serious enquiries. Enter your email to receive the confidential Investment & Security Dossier — a comprehensive overview of the estate for qualified buyers.',
    'dos.placeholder': 'your@email.com',
    'dos.btn': 'Request Dossier',
    'dos.btn.sent': 'Dossier Coming Soon',
    'dos.note': 'Your information is handled with absolute discretion and will not be shared with third parties.',

    /* contact */
    'con.label': 'Private Showings',
    'con.h2.line1': 'Schedule Your',
    'con.h2.line2': '<em>Exclusive</em> Visit',
    'con.intro': 'This property is presented exclusively to qualified buyers. All inquiries are handled with absolute discretion. Our team will respond within 24–48 hours.',
    'con.d.email': 'Email',
    'con.d.response': 'Response',
    'con.d.response.v': 'Within 24–48 hours · Qualified buyers only',
    'con.d.showings': 'Showings',
    'con.d.showings.v': 'By private appointment only',
    'con.btn.typeform': 'Complete Qualification Form',
    'con.form.title': 'Request a Private Showing',
    'con.form.subtitle': 'All fields are treated with strict confidentiality',
    'con.form.fn': 'First Name',
    'con.form.fn.ph': 'Your first name',
    'con.form.ln': 'Last Name',
    'con.form.ln.ph': 'Your last name',
    'con.form.em': 'Email Address',
    'con.form.co': 'Country of Residence',
    'con.form.co.ph': 'Country',
    'con.form.bt': 'Buyer Profile',
    'con.form.bt.0': 'Select your profile',
    'con.form.bt.1': 'Private Individual / Family',
    'con.form.bt.2': 'Diplomatic Mission',
    'con.form.bt.3': 'Corporate / Family Office',
    'con.form.bt.4': 'International Investor',
    'con.form.bt.5': 'Other',
    'con.form.fin': 'Financing Method',
    'con.form.fin.0': 'Select financing',
    'con.form.fin.1': 'Cash Purchase',
    'con.form.fin.2': 'Bank Financing',
    'con.form.fin.3': 'Other',
    'con.form.msg': 'Message',
    'con.form.msg.ph': 'I would like to schedule a private showing...',
    'con.form.submit': 'Submit Inquiry',
    'con.form.submitted': 'Inquiry Received — We Will Contact You Within 48 Hours',
    'con.form.disc': 'All inquiries handled with absolute discretion. Your information will not be shared with third parties.',

    /* footer */
    'ft.brand.desc': 'An ultra-luxury private estate set against the Ávila National Park, offering complete autonomy, military-grade security and timeless residential architecture.',
    'ft.brand.tagline': 'The most secure private residence in Venezuela.',
    'ft.col.explore': 'Explore',
    'ft.nav.overview': 'Overview',
    'ft.nav.security': 'Security & Autonomy',
    'ft.nav.amenities': 'Amenities & Lifestyle',
    'ft.nav.location': 'Location & Views',
    'ft.nav.faq': 'FAQ',
    'ft.nav.dossier': 'Investment Dossier',
    'ft.col.inquiries': 'Private Inquiries',
    'ft.c.direct': 'Direct',
    'ft.c.showings': 'Showings',
    'ft.c.showings.v': 'By appointment only',
    'ft.c.discretion': 'Discretion',
    'ft.c.discretion.v': 'Strict NDA · Qualified buyers',
    'ft.bottom.copy': '© 2025 Caracas Luxury Estate · All rights reserved',
    'ft.bottom.meta': 'Ultra-luxury private listing · Information confidential'
  },

  es: {
    /* nav */
    'nav.overview': 'Resumen',
    'nav.security': 'Seguridad',
    'nav.amenities': 'Amenidades',
    'nav.location': 'Ubicación',
    'nav.cta': 'Visita Privada',

    /* hero */
    'hero.eyebrow': 'Listado Privado Exclusivo · Caracas, Venezuela',
    'hero.h1.line1': 'Privacidad Absoluta.',
    'hero.h1.line2': 'Autonomía Total.',
    'hero.h1.line3': 'Seguridad Inigualable.',
    'hero.hook.html': 'En una era de incertidumbre global, este <strong>santuario autosuficiente</strong> ofrece seguridad de grado militar, un mes completo de independencia eléctrica y de agua, y la vista más prestigiosa del <strong>Parque Nacional Ávila</strong>. Bienvenido a la cumbre del lujo venezolano.',
    'hero.btn.dossier': 'Descargar Dossier de Inversión',
    'hero.btn.explore': 'Explorar la Propiedad',
    'hero.stat.estate': 'm² Terreno',
    'hero.stat.built': 'm² Construidos',
    'hero.stat.bedrooms': 'Dormitorios',
    'hero.stat.bathrooms': 'Baños',

    /* overview */
    'ov.label': 'La Propiedad',
    'ov.h2.line1': 'Redefiniendo la Residencia',
    'ov.h2.line2': '<em>Exclusiva</em> en Venezuela',
    'ov.p1.html': 'Esta obra maestra arquitectónica ofrece <strong>6.000 m² de sofisticado espacio habitable</strong> sobre una extensa propiedad privada de 15.000 m² en las prestigiosas colinas de Baruta — uno de los enclaves residenciales más codiciados y seguros de Caracas.',
    'ov.p2.html': 'Con dos accesos por Lomas de Chispia y Sorocaima, la propiedad garantiza absoluta privacidad y movilidad estratégica. Construida en 2006 y vendida totalmente amueblada con piezas internacionales de alta gama.',
    'ov.p3.html': 'Ya sea como <strong>residencia principal</strong>, <strong>sede diplomática</strong>, o exclusivo <strong>retiro corporativo</strong> — esta propiedad ofrece una fusión perfecta de opulencia, independencia tecnológica y seguridad de 360 grados.',
    'ov.price.label': 'Precio · Solo con Cita',
    'ov.price.note': 'Vendida totalmente amueblada · Solo compradores calificados',
    'ov.fact.totalArea': 'Área Total',
    'ov.fact.builtArea': 'Área Construida',
    'ov.fact.bedrooms': 'Dormitorios',
    'ov.fact.bedrooms.v': '12 Espaciosos',
    'ov.fact.bathrooms': 'Baños',
    'ov.fact.bathrooms.v': '10 de Diseño',
    'ov.fact.year': 'Año de Construcción',
    'ov.fact.parking': 'Estacionamientos',
    'ov.fact.parking.v': '10+ Plazas',
    'ov.fact.kitchens': 'Cocinas',
    'ov.fact.kitchens.v': '4 Gourmet',
    'ov.fact.furnishing': 'Mobiliario',
    'ov.fact.furnishing.v': 'Totalmente Amueblada',

    /* gallery */
    'gal.label': 'Galería',
    'gal.h2.line1': 'Cada Detalle,',
    'gal.h2.line2': 'una Obra Maestra',
    'gal.count': '60 fotografías curadas',
    'gal.note': 'Alta resolución · Disponibles bajo solicitud',
    'gal.l.living': 'Sala Doble Altura · Vistas al Ávila',
    'gal.l.library': 'Biblioteca Privada · Vitrales',
    'gal.l.spa': 'Baño Spa · Bañera Independiente',
    'gal.l.master': 'Suite Principal · Techo Catedral',
    'gal.l.exterior': 'Exterior · Piscina Infinity',
    'gal.btn': 'Ver Galería Completa →',

    /* video */
    'vid.label': 'Tour Cinematográfico',
    'vid.h2.line1': 'Vívelo',
    'vid.h2.line2': 'en Movimiento',
    'vid.cap': 'Vistas Panorámicas · Terraza con Piscina · Parque Nacional Ávila',

    /* security teaser */
    'sec.label': 'Seguridad y Autonomía',
    'sec.h2.line1': 'Un Santuario',
    'sec.h2.line2': 'Autosuficiente',
    'sec.c1.h': 'Infraestructura Blindada',
    'sec.c1.p': 'Muros perimetrales reforzados de grado militar y puertas balísticas diseñadas según los más altos estándares internacionales de protección.',
    'sec.c2.h': 'Independencia Eléctrica Total',
    'sec.c2.p': 'Planta diésel de 300 KVA que proporciona hasta 30 días de autonomía completa — independiente de la red pública bajo cualquier circunstancia.',
    'sec.c3.h': 'Seguridad Hídrica',
    'sec.c3.p': 'Dos tanques de reserva con un total de 1.000.000 de litros de agua dulce — independencia total del suministro municipal.',
    'sec.c4.h': 'Acceso Estratégico',
    'sec.c4.p': '500 m de vías privadas internas, dos accesos y un helipuerto privado designado para llegadas y salidas discretas y rápidas.',
    'sec.s1': 'Planta Eléctrica',
    'sec.s2': 'Reserva de Agua',
    'sec.s3': 'Vías Privadas',
    'sec.s4': 'Autonomía Total',
    'sec.s4.unit': 'días',
    'sec.btn': 'Detalles Completos de Seguridad →',

    /* amenities teaser */
    'am.label': 'Amenidades',
    'am.h2.line1': 'Su Club de',
    'am.h2.line2': 'Campo Privado',
    'am.intro': 'Espacios especializados rara vez encontrados en residencias privadas — esta propiedad es un centro de entretenimiento, bienestar y estilo de vida diseñado para los individuos más exigentes del mundo.',
    'am.c1.cat': 'Áreas Habitables',
    'am.c1.h': 'Suite Principal y Dormitorios',
    'am.c1.l1': '12 Dormitorios espaciosos',
    'am.c1.l2': '10 Baños de diseño',
    'am.c1.l3': 'Walk-in closets y acabados en mármol',
    'am.c1.l4': 'Jacuzzis privados en suites principales',
    'am.c1.l5': 'Apartamento de huéspedes dedicado',
    'am.c1.l6': 'Ascensor panorámico interno',
    'am.c2.cat': 'Bienestar y Entretenimiento',
    'am.c2.h': 'Instalaciones de Club Privado',
    'am.c2.l1': 'Gimnasio profesional y sauna',
    'am.c2.l2': 'Baño turco / hammam',
    'am.c2.l3': 'Piscina al aire libre',
    'am.c2.l4': 'Sala de cine de última generación',
    'am.c2.l5': 'Sala de juegos',
    'am.c2.l6': 'Cancha de baloncesto / multiusos',
    'am.c3.cat': 'Espacios Únicos',
    'am.c3.h': 'Amenidades Excepcionales',
    'am.c3.l1': 'Capilla privada (50–100 invitados)',
    'am.c3.l2': 'Salón de belleza dedicado',
    'am.c3.l3': 'Cuarto de zapatos especializado',
    'am.c3.l4': 'Biblioteca / estudio',
    'am.c3.l5': '4 Cocinas gourmet · Equipos Viking',
    'am.c3.l6': 'Habitaciones para personal y choferes',
    'am.btn': 'Ver Todas las Amenidades →',

    /* areas */
    'ar.1.n': 'Sala Principal',
    'ar.1.d': 'Doble Altura · Vistas al Ávila',
    'ar.2.n': 'Biblioteca Privada',
    'ar.2.d': 'Vitrales · Estanterías a Medida',
    'ar.3.n': 'Salón Privado',
    'ar.3.d': 'Spa Profesional · Pisos de Mármol',
    'ar.4.n': 'Suite Principal',
    'ar.4.d': 'Techo Catedral · Spa en Suite',

    /* location */
    'loc.label': 'Ubicación',
    'loc.h2.line1': 'La <em>Vista</em> Más',
    'loc.h2.line2': 'Codiciada de Venezuela',
    'loc.p1': 'Encaramada en las prestigiosas colinas de Baruta, la propiedad ofrece una vista panorámica directa y sin obstáculos del majestuoso Parque Nacional Ávila — un hito natural visible desde toda la propiedad.',
    'loc.p2': 'La Trinidad ofrece el equilibrio ideal entre la proximidad a los centros comerciales y diplomáticos de Caracas y la tranquilidad de un enclave elevado y arbolado, con un microclima naturalmente más fresco durante todo el año.',
    'loc.tag1': 'Vistas al Parque Nacional Ávila',
    'loc.tag2': 'La Trinidad · Baruta',
    'loc.tag3': 'Lomas de Chispia',
    'loc.tag4': 'Dos Accesos',
    'loc.tag5': 'Microclima Elevado',
    'loc.tag6': 'Enclave Exclusivo',
    'loc.btn': 'Ver Detalles de Ubicación →',
    'loc.map.cap': 'Vistas Directas al Parque Nacional Ávila',

    /* faq */
    'faq.label': 'Preguntas Frecuentes',
    'faq.h2.line1': 'Preguntas',
    'faq.h2.line2': 'Comunes',
    'faq.q1': '¿Dónde se encuentra exactamente esta propiedad blindada de lujo?',
    'faq.a1': 'Lomas de Chispia / Sorocaima, La Trinidad, Baruta, Caracas — una de las zonas residenciales más exclusivas y seguras de Venezuela, con vistas panorámicas directas al Parque Nacional Ávila. La dirección exacta solo se proporciona a compradores calificados verificados.',
    'faq.q2': '¿Cuál es el precio y qué incluye?',
    'faq.a2': 'USD $10.000.000, vendida totalmente amueblada con piezas internacionales de alta gama curadas. Incluye los 15.000 m² de terreno, todas las estructuras, planta eléctrica de 300 KVA, infraestructura de reserva de agua y todas las instalaciones fijas. Visitas privadas solo con cita para compradores calificados.',
    'faq.q3': '¿Es esta propiedad autosuficiente respecto a los servicios públicos?',
    'faq.a3': 'Sí, completamente. Una planta diésel de 300 KVA proporciona hasta 30 días de energía ininterrumpida, mientras que dos tanques de reserva entregan un total combinado de 1.000.000 de litros de agua almacenada — independencia total de la infraestructura municipal bajo cualquier circunstancia.',
    'faq.q4': '¿Es adecuada esta propiedad como vivienda diplomática en Caracas?',
    'faq.a4': 'Sí. Seguridad de grado militar, independencia total de servicios, capilla privada, habitaciones para el personal, ascensor interno, 4 cocinas gourmet y 15.000 m² de terreno la hacen ideal como sede diplomática, retiro corporativo o residencia principal para individuos de alto patrimonio.',
    'faq.q5': '¿La propiedad cuenta con helipuerto?',
    'faq.a5': 'Sí. La propiedad incluye un espacio designado como helipuerto privado junto con 500 metros de vías privadas internas y dos accesos — proporcionando máxima flexibilidad operativa y discreción para llegadas y salidas.',

    /* dossier */
    'dos.label': 'Dossier de Inversión',
    'dos.h2.line1': 'Descargue el Prospecto',
    'dos.h2.line2': 'Privado de <em>Inversión</em>',
    'dos.intro': 'Reservado para consultas serias. Ingrese su correo electrónico para recibir el Dossier confidencial de Inversión y Seguridad — una visión integral de la propiedad para compradores calificados.',
    'dos.placeholder': 'su@correo.com',
    'dos.btn': 'Solicitar Dossier',
    'dos.btn.sent': 'Dossier Próximamente',
    'dos.note': 'Su información se maneja con absoluta discreción y no será compartida con terceros.',

    /* contact */
    'con.label': 'Visitas Privadas',
    'con.h2.line1': 'Programe Su',
    'con.h2.line2': 'Visita <em>Exclusiva</em>',
    'con.intro': 'Esta propiedad se presenta exclusivamente a compradores calificados. Todas las consultas se manejan con absoluta discreción. Nuestro equipo responderá dentro de 24–48 horas.',
    'con.d.email': 'Correo',
    'con.d.response': 'Respuesta',
    'con.d.response.v': 'Dentro de 24–48 horas · Solo compradores calificados',
    'con.d.showings': 'Visitas',
    'con.d.showings.v': 'Solo con cita previa privada',
    'con.btn.typeform': 'Complete el Formulario de Calificación',
    'con.form.title': 'Solicite una Visita Privada',
    'con.form.subtitle': 'Todos los campos se tratan con estricta confidencialidad',
    'con.form.fn': 'Nombre',
    'con.form.fn.ph': 'Su nombre',
    'con.form.ln': 'Apellido',
    'con.form.ln.ph': 'Su apellido',
    'con.form.em': 'Correo Electrónico',
    'con.form.co': 'País de Residencia',
    'con.form.co.ph': 'País',
    'con.form.bt': 'Perfil del Comprador',
    'con.form.bt.0': 'Seleccione su perfil',
    'con.form.bt.1': 'Particular / Familia',
    'con.form.bt.2': 'Misión Diplomática',
    'con.form.bt.3': 'Corporativo / Family Office',
    'con.form.bt.4': 'Inversionista Internacional',
    'con.form.bt.5': 'Otro',
    'con.form.fin': 'Método de Financiamiento',
    'con.form.fin.0': 'Seleccione financiamiento',
    'con.form.fin.1': 'Compra al Contado',
    'con.form.fin.2': 'Financiamiento Bancario',
    'con.form.fin.3': 'Otro',
    'con.form.msg': 'Mensaje',
    'con.form.msg.ph': 'Me gustaría programar una visita privada...',
    'con.form.submit': 'Enviar Consulta',
    'con.form.submitted': 'Consulta Recibida — Le Contactaremos Dentro de 48 Horas',
    'con.form.disc': 'Todas las consultas se manejan con absoluta discreción. Su información no será compartida con terceros.',

    /* footer */
    'ft.brand.desc': 'Una propiedad privada de ultra lujo enclavada frente al Parque Nacional Ávila, que ofrece autonomía completa, seguridad de grado militar y arquitectura residencial atemporal.',
    'ft.brand.tagline': 'La residencia privada más segura de Venezuela.',
    'ft.col.explore': 'Explorar',
    'ft.nav.overview': 'Resumen',
    'ft.nav.security': 'Seguridad y Autonomía',
    'ft.nav.amenities': 'Amenidades y Estilo de Vida',
    'ft.nav.location': 'Ubicación y Vistas',
    'ft.nav.faq': 'Preguntas Frecuentes',
    'ft.nav.dossier': 'Dossier de Inversión',
    'ft.col.inquiries': 'Consultas Privadas',
    'ft.c.direct': 'Directo',
    'ft.c.showings': 'Visitas',
    'ft.c.showings.v': 'Solo con cita previa',
    'ft.c.discretion': 'Discreción',
    'ft.c.discretion.v': 'NDA Estricto · Compradores calificados',
    'ft.bottom.copy': '© 2025 Caracas Luxury Estate · Todos los derechos reservados',
    'ft.bottom.meta': 'Listado privado de ultra lujo · Información confidencial'
  },

  de: {
    /* nav */
    'nav.overview': 'Übersicht',
    'nav.security': 'Sicherheit',
    'nav.amenities': 'Ausstattung',
    'nav.location': 'Lage',
    'nav.cta': 'Privatbesichtigung',

    /* hero */
    'hero.eyebrow': 'Exklusives Privatangebot · Caracas, Venezuela',
    'hero.h1.line1': 'Absolute Privatsphäre.',
    'hero.h1.line2': 'Vollständige Autonomie.',
    'hero.h1.line3': 'Unvergleichliche Sicherheit.',
    'hero.hook.html': 'In einer Zeit globaler Unsicherheit bietet dieses <strong>autarke Refugium</strong> Sicherheit auf militärischem Niveau, einen ganzen Monat vollständige Strom- und Wasserunabhängigkeit sowie den prestigeträchtigsten Blick auf den <strong>Avila Nationalpark</strong>. Willkommen am Gipfel des venezolanischen Luxus.',
    'hero.btn.dossier': 'Investment-Dossier herunterladen',
    'hero.btn.explore': 'Anwesen erkunden',
    'hero.stat.estate': 'm² Grundstück',
    'hero.stat.built': 'm² Wohnfläche',
    'hero.stat.bedrooms': 'Schlafzimmer',
    'hero.stat.bathrooms': 'Badezimmer',

    /* overview */
    'ov.label': 'Das Anwesen',
    'ov.h2.line1': '<em>Exklusives</em> Wohnen in',
    'ov.h2.line2': 'Venezuela neu definiert',
    'ov.p1.html': 'Dieses architektonische Meisterwerk bietet <strong>6.000 m² anspruchsvollen Wohnraum</strong> auf einem weitläufigen 15.000 m² großen Privatgrundstück in den prestigeträchtigen Hügeln von Baruta — einer der begehrtesten und sichersten Wohngegenden von Caracas.',
    'ov.p2.html': 'Mit zwei Zugängen über Lomas de Chispia und Sorocaima gewährleistet das Anwesen sowohl absolute Privatsphäre als auch strategische Mobilität. 2006 erbaut und vollständig möbliert mit hochwertigen internationalen Designerstücken verkauft.',
    'ov.p3.html': 'Ob als <strong>Hauptwohnsitz</strong>, <strong>diplomatischer Sitz</strong> oder exklusiver <strong>Unternehmensrückzugsort</strong> — dieses Anwesen vereint perfekt Opulenz, technologische Unabhängigkeit und 360-Grad-Sicherheit.',
    'ov.price.label': 'Preis · Nur nach Vereinbarung',
    'ov.price.note': 'Vollständig möbliert verkauft · Nur qualifizierte Käufer',
    'ov.fact.totalArea': 'Gesamtfläche',
    'ov.fact.builtArea': 'Wohnfläche',
    'ov.fact.bedrooms': 'Schlafzimmer',
    'ov.fact.bedrooms.v': '12 Geräumige',
    'ov.fact.bathrooms': 'Badezimmer',
    'ov.fact.bathrooms.v': '10 Designer',
    'ov.fact.year': 'Baujahr',
    'ov.fact.parking': 'Parkplätze',
    'ov.fact.parking.v': '10+ Stellplätze',
    'ov.fact.kitchens': 'Küchen',
    'ov.fact.kitchens.v': '4 Gourmet',
    'ov.fact.furnishing': 'Möblierung',
    'ov.fact.furnishing.v': 'Voll möbliert',

    /* gallery */
    'gal.label': 'Galerie',
    'gal.h2.line1': 'Jedes Detail,',
    'gal.h2.line2': 'ein Meisterwerk',
    'gal.count': '60 kuratierte Aufnahmen',
    'gal.note': 'Hohe Auflösung · Auf Anfrage verfügbar',
    'gal.l.living': 'Wohnzimmer Doppelhöhe · Avila-Blick',
    'gal.l.library': 'Privatbibliothek · Bleiglas',
    'gal.l.spa': 'Spa-Bad · Freistehende Wanne',
    'gal.l.master': 'Master-Suite · Kathedralendecke',
    'gal.l.exterior': 'Außenansicht · Infinity-Pool',
    'gal.btn': 'Vollständige Galerie ansehen →',

    /* video */
    'vid.label': 'Filmische Tour',
    'vid.h2.line1': 'Erleben Sie es',
    'vid.h2.line2': 'in Bewegung',
    'vid.cap': 'Panoramablick · Pool-Terrasse · Avila Nationalpark',

    /* security teaser */
    'sec.label': 'Sicherheit & Autonomie',
    'sec.h2.line1': 'Ein autarkes',
    'sec.h2.line2': 'Refugium',
    'sec.c1.h': 'Gepanzerte Infrastruktur',
    'sec.c1.p': 'Verstärkte Außenmauern auf militärischem Niveau und ballistische Türen, konstruiert nach den höchsten internationalen Schutzstandards.',
    'sec.c2.h': 'Vollständige Energieunabhängigkeit',
    'sec.c2.p': '300-KVA-Diesel-Kraftwerk, das bis zu 30 Tage vollständige Autonomie bietet — unabhängig vom öffentlichen Stromnetz unter allen Umständen.',
    'sec.c3.h': 'Wassersicherheit',
    'sec.c3.p': 'Zwei Reservetanks mit insgesamt 1.000.000 Litern Frischwasserspeicherung — vollständige Unabhängigkeit von der kommunalen Versorgung.',
    'sec.c4.h': 'Strategischer Zugang',
    'sec.c4.p': '500 m private interne Straßen, zwei Zugangspunkte und ein eigens ausgewiesener Privathubschrauberlandeplatz für diskrete, schnelle An- und Abreise.',
    'sec.s1': 'Kraftwerk',
    'sec.s2': 'Wasserreserve',
    'sec.s3': 'Privatstraßen',
    'sec.s4': 'Vollständige Autonomie',
    'sec.s4.unit': 'Tage',
    'sec.btn': 'Vollständige Sicherheitsdetails →',

    /* amenities teaser */
    'am.label': 'Ausstattung',
    'am.h2.line1': 'Ihr privater',
    'am.h2.line2': 'Country Club',
    'am.intro': 'Spezialisierte Räume, die in Privatresidenzen selten zu finden sind — dieses Anwesen ist ein Zentrum für Unterhaltung, Wellness und Lebensstil, konzipiert für die anspruchsvollsten Persönlichkeiten der Welt.',
    'am.c1.cat': 'Wohnbereiche',
    'am.c1.h': 'Master-Suite & Schlafzimmer',
    'am.c1.l1': '12 Geräumige Schlafzimmer',
    'am.c1.l2': '10 Designer-Badezimmer',
    'am.c1.l3': 'Begehbare Kleiderschränke & Marmor',
    'am.c1.l4': 'Private Whirlpools in Hauptsuiten',
    'am.c1.l5': 'Eigene Gästewohnung',
    'am.c1.l6': 'Interner Panorama-Aufzug',
    'am.c2.cat': 'Wellness & Unterhaltung',
    'am.c2.h': 'Privatclub-Einrichtungen',
    'am.c2.l1': 'Profi-Fitnessstudio & Sauna',
    'am.c2.l2': 'Türkisches Bad / Hammam',
    'am.c2.l3': 'Außen-Schwimmbad',
    'am.c2.l4': 'Hochmodernes Kino',
    'am.c2.l5': 'Spielzimmer',
    'am.c2.l6': 'Basketball- / Mehrzweckplatz',
    'am.c3.cat': 'Einzigartige Räume',
    'am.c3.h': 'Einzigartige Annehmlichkeiten',
    'am.c3.l1': 'Privatkapelle (50–100 Gäste)',
    'am.c3.l2': 'Eigener Friseursalon',
    'am.c3.l3': 'Spezielles Schuhzimmer',
    'am.c3.l4': 'Bibliothek / Studio',
    'am.c3.l5': '4 Gourmet-Küchen · Viking-Geräte',
    'am.c3.l6': 'Personal- & Fahrerquartiere',
    'am.btn': 'Alle Annehmlichkeiten ansehen →',

    /* areas */
    'ar.1.n': 'Wohnzimmer',
    'ar.1.d': 'Doppelhöhe · Avila-Blick',
    'ar.2.n': 'Privatbibliothek',
    'ar.2.d': 'Bleiglas · Maßgefertigte Regale',
    'ar.3.n': 'Privater Salon',
    'ar.3.d': 'Profi-Spa · Marmorböden',
    'ar.4.n': 'Master-Suite',
    'ar.4.d': 'Kathedralendecke · En-Suite-Spa',

    /* location */
    'loc.label': 'Lage',
    'loc.h2.line1': 'Die begehrteste',
    'loc.h2.line2': '<em>Aussicht</em> Venezuelas',
    'loc.p1': 'Auf den prestigeträchtigen Hügeln von Baruta gelegen, bietet das Anwesen einen direkten, ungehinderten Panoramablick auf den majestätischen Avila Nationalpark — ein Naturwahrzeichen, das von überall auf dem Grundstück sichtbar ist.',
    'loc.p2': 'La Trinidad bietet die ideale Balance zwischen der Nähe zu Caracas\' Geschäfts- und Diplomatenzentren und der Ruhe einer erhöhten, bewaldeten Enklave mit einem natürlich kühleren Mikroklima das ganze Jahr über.',
    'loc.tag1': 'Avila-Nationalpark-Blick',
    'loc.tag2': 'La Trinidad · Baruta',
    'loc.tag3': 'Lomas de Chispia',
    'loc.tag4': 'Zwei Zugangspunkte',
    'loc.tag5': 'Erhöhtes Mikroklima',
    'loc.tag6': 'Exklusive Enklave',
    'loc.btn': 'Standortdetails ansehen →',
    'loc.map.cap': 'Direkter Avila-Nationalpark-Blick',

    /* faq */
    'faq.label': 'FAQ',
    'faq.h2.line1': 'Häufige',
    'faq.h2.line2': 'Fragen',
    'faq.q1': 'Wo genau befindet sich dieses gepanzerte Luxusanwesen?',
    'faq.a1': 'Lomas de Chispia / Sorocaima, La Trinidad, Baruta, Caracas — eine der exklusivsten und sichersten Wohngegenden Venezuelas, mit direktem Panoramablick auf den Avila Nationalpark. Die genaue Adresse wird nur verifizierten qualifizierten Käufern mitgeteilt.',
    'faq.q2': 'Wie hoch ist der Verkaufspreis und was ist enthalten?',
    'faq.a2': 'USD 10.000.000, vollständig möbliert verkauft mit kuratierten internationalen Designerstücken. Beinhaltet das 15.000 m² große Anwesen, alle Strukturen, das 300-KVA-Kraftwerk, die Wasserreserve-Infrastruktur und alle festen Installationen. Privatbesichtigungen nur nach Vereinbarung für qualifizierte Käufer.',
    'faq.q3': 'Ist dieses Anwesen autark von öffentlichen Versorgungseinrichtungen?',
    'faq.a3': 'Ja, vollständig. Ein 300-KVA-Diesel-Kraftwerk liefert bis zu 30 Tage ununterbrochenen Strom, während zwei Reservetanks insgesamt 1.000.000 Liter gespeichertes Wasser bereitstellen — totale Unabhängigkeit von kommunaler Infrastruktur unter allen Umständen.',
    'faq.q4': 'Eignet sich das Anwesen als diplomatischer Wohnsitz in Caracas?',
    'faq.a4': 'Ja. Sicherheit auf militärischem Niveau, vollständige Versorgungsunabhängigkeit, Privatkapelle, Personalunterkünfte, interner Aufzug, 4 Gourmet-Küchen und 15.000 m² Grundstück machen es ideal als diplomatischen Sitz, Unternehmensrückzugsort oder Hauptwohnsitz für vermögende Privatpersonen.',
    'faq.q5': 'Verfügt das Anwesen über einen Hubschrauberlandeplatz?',
    'faq.a5': 'Ja. Das Anwesen umfasst einen ausgewiesenen privaten Hubschrauberlandeplatz sowie 500 Meter interne Privatstraßen und zwei Zugangspunkte — das bietet maximale operative Flexibilität und Diskretion bei An- und Abreisen.',

    /* dossier */
    'dos.label': 'Investment-Dossier',
    'dos.h2.line1': 'Das private Investment-',
    'dos.h2.line2': '<em>Prospekt</em> herunterladen',
    'dos.intro': 'Reserviert für seriöse Anfragen. Geben Sie Ihre E-Mail-Adresse ein, um das vertrauliche Investment- und Sicherheitsdossier zu erhalten — eine umfassende Übersicht des Anwesens für qualifizierte Käufer.',
    'dos.placeholder': 'ihre@email.com',
    'dos.btn': 'Dossier anfragen',
    'dos.btn.sent': 'Dossier in Kürze',
    'dos.note': 'Ihre Daten werden mit absoluter Diskretion behandelt und nicht an Dritte weitergegeben.',

    /* contact */
    'con.label': 'Privatbesichtigungen',
    'con.h2.line1': 'Vereinbaren Sie Ihren',
    'con.h2.line2': '<em>exklusiven</em> Besuch',
    'con.intro': 'Dieses Anwesen wird ausschließlich qualifizierten Käufern präsentiert. Alle Anfragen werden mit absoluter Diskretion behandelt. Unser Team antwortet innerhalb von 24–48 Stunden.',
    'con.d.email': 'E-Mail',
    'con.d.response': 'Antwort',
    'con.d.response.v': 'Innerhalb 24–48 Stunden · Nur qualifizierte Käufer',
    'con.d.showings': 'Besichtigungen',
    'con.d.showings.v': 'Nur nach privater Vereinbarung',
    'con.btn.typeform': 'Qualifizierungsformular ausfüllen',
    'con.form.title': 'Privatbesichtigung anfragen',
    'con.form.subtitle': 'Alle Felder werden streng vertraulich behandelt',
    'con.form.fn': 'Vorname',
    'con.form.fn.ph': 'Ihr Vorname',
    'con.form.ln': 'Nachname',
    'con.form.ln.ph': 'Ihr Nachname',
    'con.form.em': 'E-Mail-Adresse',
    'con.form.co': 'Wohnsitzland',
    'con.form.co.ph': 'Land',
    'con.form.bt': 'Käuferprofil',
    'con.form.bt.0': 'Profil auswählen',
    'con.form.bt.1': 'Privatperson / Familie',
    'con.form.bt.2': 'Diplomatische Mission',
    'con.form.bt.3': 'Unternehmen / Family Office',
    'con.form.bt.4': 'Internationaler Investor',
    'con.form.bt.5': 'Andere',
    'con.form.fin': 'Finanzierungsmethode',
    'con.form.fin.0': 'Finanzierung auswählen',
    'con.form.fin.1': 'Barkauf',
    'con.form.fin.2': 'Bankfinanzierung',
    'con.form.fin.3': 'Andere',
    'con.form.msg': 'Nachricht',
    'con.form.msg.ph': 'Ich möchte eine Privatbesichtigung vereinbaren...',
    'con.form.submit': 'Anfrage senden',
    'con.form.submitted': 'Anfrage erhalten — Wir kontaktieren Sie innerhalb 48 Stunden',
    'con.form.disc': 'Alle Anfragen werden mit absoluter Diskretion behandelt. Ihre Daten werden nicht an Dritte weitergegeben.',

    /* footer */
    'ft.brand.desc': 'Ein ultra-luxuriöses Privatanwesen am Fuße des Avila Nationalparks, das vollständige Autonomie, militärische Sicherheit und zeitlose Wohnarchitektur bietet.',
    'ft.brand.tagline': 'Die sicherste private Residenz Venezuelas.',
    'ft.col.explore': 'Entdecken',
    'ft.nav.overview': 'Übersicht',
    'ft.nav.security': 'Sicherheit & Autonomie',
    'ft.nav.amenities': 'Ausstattung & Lebensstil',
    'ft.nav.location': 'Lage & Aussicht',
    'ft.nav.faq': 'FAQ',
    'ft.nav.dossier': 'Investment-Dossier',
    'ft.col.inquiries': 'Private Anfragen',
    'ft.c.direct': 'Direkt',
    'ft.c.showings': 'Besichtigungen',
    'ft.c.showings.v': 'Nur nach Vereinbarung',
    'ft.c.discretion': 'Diskretion',
    'ft.c.discretion.v': 'Strenge NDA · Qualifizierte Käufer',
    'ft.bottom.copy': '© 2025 Caracas Luxury Estate · Alle Rechte vorbehalten',
    'ft.bottom.meta': 'Ultra-Luxus-Privatangebot · Informationen vertraulich'
  }
};

(function () {
  const SUPPORTED = ['en', 'es', 'de'];
  const STORAGE_KEY = 'cle_lang';

  function getInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : 'en';
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const dict = I18N[lang];
    document.documentElement.lang = lang;

    /* text content */
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    /* HTML content (for strings with <strong>, <em>, etc.) */
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    /* placeholders */
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    /* aria-labels */
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    /* update active language pill */
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function init() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        applyLang(btn.dataset.lang);
      });
    });
    applyLang(getInitialLang());
  }

  /* Expose API */
  window.CLE_I18N = { apply: applyLang, current: getInitialLang };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
