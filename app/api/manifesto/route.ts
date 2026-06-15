import { generateManifestoFromInterview } from "../../../src/lib/brand/setup/manifesto-interview/manifesto-generator";
import { adaptGeneratedConstitution } from "../../../src/lib/brand/constitution-generator/constitution-adapter";
import { saveConstitution } from "../../../src/lib/brand/constitution-store/constitution-store";

export async function POST(req: Request) {
  try {
    const input = await req.json();

    const manifesto = generateManifestoFromInterview({
      brandId: input.brandId || "tilla-leather",
      brandType: input.brandType || "product",
      answers: input.answers || [],
    });

    const adaptedConstitution = adaptGeneratedConstitution(
      manifesto.constitution,
      manifesto.text,
    );

    saveConstitution(adaptedConstitution);

    return new Response(
      JSON.stringify({
        success: true,
        manifesto,
        constitution: adaptedConstitution,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch (error: any) {
    console.error("MANIFESTO API ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "manifesto_error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }
}
