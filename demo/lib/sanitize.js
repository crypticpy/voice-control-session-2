/**
 * Input validation and output sanitization for the Policy Plain Language Converter.
 */

/**
 * Validates the user-provided text input.
 * @param {*} text - The input to validate
 * @returns {{ valid: true, text: string } | { valid: false, error: string }}
 */
export function validateInput(text) {
  if (text === null || text === undefined) {
    return {
      valid: false,
      error:
        "Please paste some policy text to convert. The text field cannot be empty.",
    };
  }

  if (typeof text !== "string") {
    return {
      valid: false,
      error: "Please provide the policy text as plain text.",
    };
  }

  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return {
      valid: false,
      error:
        "Please paste some policy text to convert. The text field cannot be empty.",
    };
  }

  if (trimmed.length < 50) {
    return {
      valid: false,
      error:
        "The text is too short. Please provide at least a full paragraph of policy text for an accurate conversion.",
    };
  }

  if (trimmed.length > 100_000) {
    return {
      valid: false,
      error:
        "The text exceeds 100,000 characters. Please submit a shorter section of the policy.",
    };
  }

  return { valid: true, text: trimmed };
}

/**
 * Strips markdown and HTML formatting from a string value.
 * Removes: bold (**), italic (*), headings (##), HTML tags, bullet characters.
 * @param {string} str - The string to clean
 * @returns {string}
 */
function stripFormatting(str) {
  if (typeof str !== "string") {
    return str;
  }

  let cleaned = str;

  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");

  // Remove markdown bold (**text** or __text__)
  cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, "$1");
  cleaned = cleaned.replace(/__(.+?)__/g, "$1");

  // Remove markdown italic (*text* or _text_) — single asterisk/underscore
  // Be careful not to strip legitimate uses; only strip when wrapping words
  cleaned = cleaned.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, "$1");
  cleaned = cleaned.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, "$1");

  // Remove markdown headings (## text)
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, "");

  // Remove bullet characters (bullet dot, en dash as bullet, leading dashes)
  cleaned = cleaned.replace(/^[\u2022\u2023\u25E6\u2043\u2219]\s*/gm, "");
  cleaned = cleaned.replace(/^[-\u2013\u2014]\s+/gm, "");

  return cleaned;
}

/**
 * Deep-clones the parsed output object and strips markdown/HTML from all string values.
 * @param {object} parsed - The parsed structured output from Azure OpenAI
 * @returns {object} Cleaned copy with all string values sanitized
 */
export function sanitizeOutput(parsed) {
  return deepCleanStrings(structuredClone(parsed));
}

/**
 * Recursively walks an object/array and applies stripFormatting to all string values.
 * @param {*} obj - The value to process
 * @returns {*} The processed value
 */
function deepCleanStrings(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return stripFormatting(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCleanStrings);
  }

  if (typeof obj === "object") {
    const cleaned = {};
    for (const key of Object.keys(obj)) {
      cleaned[key] = deepCleanStrings(obj[key]);
    }
    return cleaned;
  }

  return obj;
}
