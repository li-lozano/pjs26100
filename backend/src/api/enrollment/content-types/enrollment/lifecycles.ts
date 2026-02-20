export default {
  async beforeCreate(event) {
    const { data } = event.params;

    // Si ya existe un código (por ejemplo, al publicar un borrador), no generamos uno nuevo
    if (data.code) {
      return;
    }

    // Use current year
    const year = new Date().getFullYear();
    const prefix = `RDL${year}`;

    // Find the latest enrollment code for the current year
    // using Strapi v5 Document Service, including drafts
    const enrollments = await strapi.documents('api::enrollment.enrollment').findMany({
      filters: {
        code: {
          $startsWith: prefix,
        },
      },
      status: 'draft', // Strapi v5: 'draft' incluye tanto borradores como publicados en la búsqueda del Document Service
      sort: { code: 'desc' },
      limit: 1,
    });

    const latestEnrollment = enrollments[0];

    let nextSequence = 1;

    if (latestEnrollment && latestEnrollment.code) {
      // Extract the sequence part (last 3 digits) and increment
      const lastSequenceStr = latestEnrollment.code.replace(prefix, '');
      const lastSequence = parseInt(lastSequenceStr, 10);

      if (!isNaN(lastSequence)) {
        nextSequence = lastSequence + 1;
      }
    }

    // Format with 3 digits padding (e.g., 001, 010, 100)
    const sequencePart = String(nextSequence).padStart(3, '0');
    data.code = `${prefix}${sequencePart}`;
  },
};
