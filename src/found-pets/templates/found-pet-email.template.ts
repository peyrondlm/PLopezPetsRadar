import { generateMapboxImage } from "src/core/utils/utils";
import { CreateFoundPetDto } from "src/core/interfaces/found-pet.interface";
import { LostPet } from "src/core/db/entities/lost-pet.entity";

export const generateFoundPetEmailTemplate = (
  found: CreateFoundPetDto,
  lost: LostPet
): string => {

  const imageUrl = generateMapboxImage(
    found.location.lat,
    found.location.lng,
    lost.location.coordinates[1], // lat
    lost.location.coordinates[0]  // lon
  );

  const date = new Date().toLocaleDateString("es-MX", { 
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:32px 0;">
          <tr>
              <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                      <!-- Header -->
                      <tr>
                          <td style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:32px 40px;">
                              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
                                  Posible coincidencia encontrada 🚨🚨🐒👂🏿🗣️🧢🐾🚨🚨
                              </h1>
                              <p style="margin:8px 0 0;color:#dcfce7;font-size:14px;">
                                  Podría ser tu mascota perdida
                              </p>
                          </td>
                      </tr>

                      <!-- LOST PET -->
                      <tr>
                          <td style="padding:32px 40px 0;">
                              <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                  Tu mascota perdida
                              </h2>
                              <ul style="margin:0;padding-left:16px;color:#1f2937;font-size:16px;">
                                  <li><b>Nombre:</b> ${lost.name}</li>
                                  <li><b>Especie:</b> ${lost.species}</li>
                                  <li><b>Raza:</b> ${lost.breed ?? 'No especificada'}</li>
                                  <li><b>Color:</b> ${lost.color}</li>
                              </ul>
                          </td>
                      </tr>

                      <!-- FOUND PET -->
                      <tr>
                          <td style="padding:24px 40px 0;">
                              <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                  Mascota encontrada
                              </h2>
                              <ul style="margin:0;padding-left:16px;color:#1f2937;font-size:16px;">
                                  <li><b>Especie:</b> ${found.species}</li>
                                  <li><b>Raza:</b> ${found.breed ?? 'No especificada'}</li>
                                  <li><b>Color:</b> ${found.color}</li>
                                  <li><b>Descripción:</b> ${found.description}</li>
                              </ul>
                          </td>
                      </tr>

                      <!-- CONTACT -->
                      <tr>
                          <td style="padding:24px 40px 0;">
                              <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;">
                                  Datos de contacto
                              </h2>
                              <ul style="margin:0;padding-left:16px;color:#1f2937;font-size:16px;">
                                  <li><b>Nombre:</b> ${found.finder_name}</li>
                                  <li><b>Email:</b> ${found.finder_email}</li>
                                  <li><b>Teléfono:</b> ${found.finder_phone}</li>
                              </ul>
                          </td>
                      </tr>

                      <!-- MAP -->
                      <tr>
                          <td style="padding:24px 40px;">
                              <img src="${imageUrl}" width="520" style="width:100%;border-radius:12px;" alt="Mapa"/>
                              <p style="font-size:12px;color:#6b7280;margin-top:8px;width:100%">
                                  🔴 Punto rojo: donde se perdió | 🟢 Punto verde: donde se encontró
                              </p>
                          </td>
                      </tr>

                      <!-- FOOTER -->
                      <tr>
                          <td style="padding:0 40px 32px;">
                              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;padding-top:20px;">
                                  <tr>
                                      <td>
                                          <p style="margin:0;font-size:12px;color:#9ca3af;">
                                              Reporte generado el ${date}
                                          </p>
                                          <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
                                              Sistema PetRadar
                                          </p>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>

                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
};