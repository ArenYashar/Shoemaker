// Shadowrun SIN Generator (shoemaker.js)
// Written by: /u/ArenYashar
// Version 2.1

// Helper Functions
var calculateSINchecksum = function (SIN, isCriminalSIN)
{"use strict";
 // Handle a missing or non-boolean isCriminalSIN
 if (true !== isCriminalSIN)
 {isCriminalSIN = false;
 }

 // Detect and handle invalid SIN input.
 if ("string" !== typeof SIN)
 {throw new Error("Invalid SIN (String Expected) submitted to calculateSINchecksum: " + SIN);
 }
 
 // Finesse SIN input to extract just the useful SIN data.
 SIN = SIN.replace(/\W/g, "");
 if (17 === SIN.length)
 {SIN = SIN.substring(0,16);
 }

 // Handle any lingering cases of invalid SIN input.
 if (16 > SIN.length || 17 < SIN.length)
 {throw new Error("Invalid SIN (16 Characters Expected) submitted to calculateSINchecksum: " + SIN);
 }

 // Calculate the check digit.
 var digit,
     where,
     checkdigit = (isCriminalSIN ? 18 : 0);

 for (where = 0; where < SIN.length; where += 1)
 {digit = SIN[where].toString(10);
  checkdigit += parseInt(digit, 36);
 }
 checkdigit = checkdigit % 36;
 checkdigit = checkdigit.toString(36).toUpperCase();

 return checkdigit;
};

var extractInitials = function (name)
{"use strict";

 // Detect and handle invalid name input.
 if ("string" !== typeof name)
 {throw new Error("Invalid name (String Expected) submitted to extractInitials: " + name);
 }

 // Reject incomplete names
 if (2 !== name.split(" ").length - 1)
 {throw new Error("Invalid name (First Middle and Last names Expected) submitted to extractInitials: " + name);
 }

 var initials = name.split(" ")[0][0] + name.split(" ")[1][0] + name.split(" ")[2][0];

 return initials.toUpperCase();
};

var encodeBirthdate = function (date)
{"use strict";

 // Attempt to compile an input string if provided in lieu of a date object.
 if ("string" !== typeof date)
 {var temp = new Date(date);
  if (!isNaN(temp.valueOf()))
  {date = temp;
  }
 }

 // Detect and handle invalid date input.
 if (!("object" === typeof date && date instanceof Date))
 {throw new Error("Invalid date (Date Expected) submitted to encodeBirthdate: " + date);
 }

 // Set the time component of the date to 0h zulu.
 date.setUTCHours(0);
 date.setUTCMinutes(0);
 date.setUTCSeconds(0);
 date.setUTCMilliseconds(0);

 // Convert the date to a bastardized UNIX time in base 36 notation.
 return parseInt(date.valueOf()/100000).toString(36).toUpperCase();
};

var encode = function (where)
{"use strict";

 // Detect and handle invalid where input.
 if ("string" !== typeof where)
 {throw new Error("Invalid where (String Expected) submitted to encode: " + where);
 }

 // Attempt to parse a string based input to a valid pluscode.  Additional parsing for other countries in the world can be added here.
 switch (where.toUpperCase())
 {/* Corporate (AAA Rated - SR2) */
  case "AM": // Ares Macrotechnology
   where = "86JR8X00+"; // Headquarters is in Detroit, Michigan
   break;
  case "AZT": // Aztechnology
   where = "76F2CV00+"; // Headquarters is in Mexico City (Tenochitilán), Aztlan
   break;
  case "CAT": // Cross Applied Technologies
   where = "87Q8GC00+"; // Capital is Montreal, Republic of Québec
   break;
  case "FIE": // Fuchi Industrial Electronics
   where = "8Q7XMM00+"; // Headquarters is in Tokyo, Japan
   break;
  case "MCT": // Mitsuhama Computer Technologies
   where = "8Q7Q2Q00+"; // Headquarters is in Kyoto, Japan
   break;
  case "RCS": // Renraku Computer Systems
   where = "8R72J400+"; // Headquarters is in Chiba, Japan
   break;
  case "SKC": // Saeder-Krupp Corporation
   where = "9F39F200+"; // Headquarters is in Essen, Germany
   break;
  case "SC": // Shiawase Corporation
   where = "8Q6QMGV2+"; // Headquarters is in Osaka, Japan
   break;
  case "WI": // Wuxing Incorporated
   where = "+"; // Headquarters is in the Hong Kong Free Enterprise Enclave
   break;
  case "YC": // Yamatetsu Corporation
   where = "8QMH4V00+"; // Headquarters is in Vladivostok, Russia
   break;

  /* Native American Nations */
  case "AMC": // Algonkian-Manitou Couuncil
   where = "954M4800+"; // Capital is Saskatoon, Saskatchewan
   break;
  case "ATHABASKA": // Athabaskan Council
   where = "9558GG00+"; // Capital is Edmonton, Alberta
   break;
  case "PCC": // Pueblo Corporate Council
   where = "857PM300+"; // Capital is Santa Fe, New Mexico
   break;
  case "SSC": // Salish-Shidhe Council
   where = "84WVQG00+"; // Capital is Bellingham, Washington
   break;
  case "SIOUX": // Sioux
   where = "85HQ45QH+"; // Capital is Cheyenne, Wyoming
   break;
  case "TPA": // Trans-Polar Aleut Nation
   where = "94W8976G+"; // Capital is Inuvik, Northwest Territories
   break;
  case "TSIMSHIAN": // Tsimshian
   where = "946H2900+"; // Capital is Kitimat, British Columbia
   break;
  case "UTE": // Ute Nation
   where = "85GC6800+"; // Capital is Provo, Utah
   break;

  /* North America */
  case "CFS": // California Free State
   where = "84CWHG00+"; // Capital is Sacramento, California
   break;
  case "CAS": // The Confederation of American States
   where = "865QPJ00+"; // Capital is Atlanta, Georgia
   break;
  case "DENVER": // Denver
   where = "85FQP200+"; // Capital is Denver, Colorado
   break;
  case "QUEBEC": // The Republic of Québec
   where = "87RCRQ00+"; // Capital is Québec City, Quebec
   break;
  case "TIR TAIRNGIRE": // Tir Tairngire
   where = "84QVG800+"; // Capital is Portland, Oregon
   break;
  case "UCAS": // The United Canadian and American States
   where = "87C4WX00+"; // Capital is Washington, District of Columbia
   break;

  default:
 }

 // Detect and handle invalid where data.
 if (9 !== where.length)
 {throw new Error("Invalid where (9 Character String Expected) submitted to encode: " + where);
 }
 if (where !== where.match(/[0-9A-Z]{8}[+]/).toString())
 {throw new Error("Invalid where (Valid Pluscode Expected) submitted to encode: " + where);
 }

 // Extract the area code from the validated plus code.
 return where.substring(0,4);
};

// Main Function

var generateSIN = function (name, birthdate, birthplace, citizenship, isCriminalSIN)
{"use strict";

 var initials = extractInitials(name);
 var date = encodeBirthdate(birthdate);
 var origin = encode(birthplace);
 var citizenOf = encode(citizenship);
 
 var SIN = date[0] + // Digit 1 of Encoded Birthdate
           origin[0] + // Digit 1 of Encoded Origin
           citizenOf[0] + // Digit 1 of Encoded Citizenship
           initials[0] + // First Initial
           date[1] + // Digit 2 of Encoded Birthdate
           origin[1] + // Digit 2 of Encoded Origin
           "-" + // ------------------------------
           citizenOf[1] + // Digit 2 of Encoded Citizenship
           initials[1] + // Middle Initial
           date[2] + // Digit 3 of Encoded Birthdate
           origin[2] + // Digit 3 of Encoded Origin
           citizenOf[2] + // Digit 3 of Encoded Citizenship
           "-" + // ------------------------------
           initials[2] + // Last Initial
           date[3] + // Digit 4 of Encoded Birthdate
           origin[3] + // Digit 4 of Encoded Origin
           citizenOf[3] + // Digit 4 of Encoded Citizenship
           date[4]; // Digit 5 of Encoded Birthdate

 return SIN + calculateSINchecksum(SIN, isCriminalSIN);
};

/* // Testing checksum generator versus known precalculated checksums...
function testchecksum(partialSIN, expectedchecksum)
{"use strict";
 console.log(partialSIN + " should give us " + expectedchecksum + " and we get " + calculateSINchecksum(partialSIN));
 return calculateSINchecksum(partialSIN) === expectedchecksum;
}
if (testchecksum("A88CC7-7AGMC-MOG40", "A") &&
   testchecksum("A88JE5-4PIVW-T04V0", "M") &&
   testchecksum("C88C05-7ALFC-MCQ40", "U") &&
   testchecksum("A88JE5-4EIVW-T04V0", "B") &&
   testchecksum("A88CC7-7A1MC-MCG40", "J") &&
   testchecksum("A88EA4-4YD9C-ECVW0", "Z") === true)
{
 console.log("[OK] Checksum Generator");
}/**/

/* // Testing SIN generator versus known precalculated SINs...
function testSIN(name, birthdate, birthplace, citizenship, expectedSIN)
{"use strict";
 console.log("[" + name + ", " + birthdate + ", " + birthplace + ", " + citizenship + " should give us " + expectedSIN + " and we get " + generateSIN(name, birthdate, birthplace, citizenship));
 return generateSIN(name, birthdate, birthplace, citizenship) === expectedSIN;
}
if (testSIN("Charles Arthur Mallory", new Date("December 16, 2033"), "85FQP200+", "UCAS", "C88C05-7ALFC-MCQ40U") &&
    testSIN("John Edward Thorpe", new Date("May 15, 2025"), "85V4MH00+", "SSC", "A88JE5-4EIVW-T04V0B") &&
    testSIN("Eugene Yoshi Edwards", new Date("October 4, 2024"), "849VQH00+", "CFS", "A88EA4-4YD9C-ECVW0Z") === true)
{
 console.log("[OK] SIN Generator");
}/**/
