import ReadTutor from "@lib/services/private/ReadTutor";
import ReadDegrees from "@lib/services/private/ReadDegrees";
import ReadAcademicPeriods from "@lib/services/private/ReadAcademicPeriods";
import type { Degree, AcademicPeriod } from "@lib/types/enrollment";

export function isTutor(user: any): boolean {
  return user?.role?.name?.toLowerCase() === "tutor";
}

export async function getTutorPageData(token: string, tutorId: string) {
  try {
    const [tutorData, degrees, academicPeriods] = await Promise.all([
      ReadTutor(token, tutorId),
      ReadDegrees(token),
      ReadAcademicPeriods(token),
    ]);

    return {
      tutorData,
      degrees,
      academicPeriods,
      error: null
    };
  } catch (error) {
    console.error("Error fetching tutor page data:", error);
    return {
      tutorData: null,
      degrees: [],
      academicPeriods: [],
      error: "Ocurrió un error al cargar los datos. Por favor, intente nuevamente."
    };
  }
}
