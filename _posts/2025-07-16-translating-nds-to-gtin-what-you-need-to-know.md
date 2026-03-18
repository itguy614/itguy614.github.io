---
layout: post
menubar_toc: true
title: 'From NDC-10 to GTIN-14: What You Need to Know'
author: Kurt Wolf
summary: |-
    Explains how to accurately convert a 10-digit National Drug Code (NDC-10) to a GTIN-14 identifier for use in GS1-compliant barcodes. The GTIN-14 is constructed by combining a packaging indicator, the fixed GS1 pharmaceutical prefix "03", the raw NDC-10, and a Modulo 10 check digit. This post details the correct 14-digit structure, provides a step-by-step check digit calculation, and includes Python code to automate the process. This guidance is essential for pharmaceutical serialization, traceability, and DSCSA compliance.
---

> **Correction (March 2026):** An earlier version of this post stated that GTIN-14 was constructed from NDC-11. This was incorrect. The GTIN-14 uses the **raw 10-digit NDC** combined with the GS1 pharmaceutical prefix `03`, not the 11-digit HIPAA-normalized format. The structure, examples, check digit calculation, and Python code have all been corrected. See also: [NDC 12 Is Official: The FDA Final Rule and What Comes Next](/2026/fda-finalizes-ndc-12-what-it-means).

The National Drug Code (NDC) system is a foundational part of pharmaceutical identification in the United States. However, when it comes to global serialization and barcoding, especially for unit-level tracking under DSCSA or for GS1-compliant barcodes like DataMatrix, you will often encounter the GTIN-14 (Global Trade Item Number). This post clarifies how to convert NDCs to GTINs, and just as importantly, when not to.

## What is a GTIN-14

A GTIN-14 is a 14-digit identifier used globally to distinguish trade items. It is a requirement for GS1 barcodes and essential for encoding drug products in a way that supports traceability, recall execution, and global interoperability.

A GTIN-14 for a U.S. drug product is composed of four parts totaling exactly **14 digits**:

1. A **1-digit Packaging Indicator** (values 1 through 8 depending on the packaging hierarchy)
2. The fixed **GS1 pharmaceutical prefix `03`** (2 digits) — the `0` is the standard GTIN-12 to GTIN-14 expansion, and the `3` is the UPC Number System Character reserved for NDC products
3. The **NDC-10** (10 digits) — the raw 10-digit NDC with hyphens removed
4. A **1-digit Check Digit**, calculated using the GS1 Modulo 10 algorithm

```
GTIN-14 = [Indicator] + [0] + [3] + [NDC-10] + [Check Digit]
              1 digit    1     1     10 digits     1 digit    = 14 digits
```

## NDC Formats: 10 Digit vs 11 Digit

| Format | Description                          | Example      |
| ------ | ------------------------------------ | ------------ |
| NDC-10 | FDA-assigned format                  | 1234-5678-90 |
| NDC-11 | Normalized for billing and databases | 01234567890  |

The NDC-10 is commonly printed on drug packaging and can appear in one of three segment structures: 4-4-2, 5-3-2, or 5-4-1. NDC-11 is the HIPAA-normalized form where each segment is padded with leading zeros to produce a 5-4-2 structure.

**Important:** NDC-11 is used for billing, claims processing, and pharmacy management systems. It is **not** the format used to construct a GTIN-14. The GTIN uses the raw NDC-10 with the `03` prefix, which is structurally different from NDC-11.

## NDC-11 Is Not the Same as the GTIN Inner Digits

This is a common source of confusion. The 12-digit body of a GTIN-14 (positions 2 through 13) is `03` followed by the raw NDC-10. The NDC-11, on the other hand, is formed by padding a *specific segment* of the NDC-10 with a leading zero. These produce different digit sequences.

| NDC-10 Format | NDC-10 (raw) | NDC-11 (5-4-2) | GTIN body (03 + NDC-10) |
| --- | --- | --- | --- |
| 4-4-2: `1234-5678-90` | `1234567890` | `01234567890` | `031234567890` |
| 5-3-2: `12345-678-90` | `1234567890` | `12345067890` | `031234567890` |
| 5-4-1: `12345-6789-0` | `1234567890` | `12345678900` | `031234567890` |

Notice that all three NDC-10 formats produce the **same** GTIN body (`031234567890`), but each produces a **different** NDC-11. The GTIN resolves the ambiguity of the variable-length NDC-10 by ignoring segment boundaries entirely and prepending the fixed `03` prefix.

## How to Convert NDC-10 to GTIN-14

Once you have the correct NDC-10, the process of creating a GTIN-14 is straightforward.

### Step-by-Step Instructions

1. Start with the NDC-10, such as `0409-4921-34`
2. Remove hyphens to get the 10-digit string: `0409492134`
3. Prepend the packaging indicator and the `03` prefix: `1` + `03` + `0409492134` = `1030409492134` (13 digits)
4. Calculate the check digit using the GS1 Modulo 10 method
5. Append the check digit to produce a valid GTIN-14

### Example

| Component           | Value          |
| ------------------- | -------------- |
| Packaging Indicator | 1              |
| GS1 Prefix          | 03             |
| NDC-10              | 0409492134     |
| 13-digit Base       | 1030409492134  |
| Check Digit         | 8              |
| **GTIN-14**         | **10304094921348** |

## How the GTIN-14 Check Digit is Calculated

The check digit is the final digit in the GTIN-14. It is calculated using the GS1 Modulo 10 algorithm. This checksum helps detect data entry or scanning errors.

### Calculation Method

1. Start from the rightmost digit of the 13-digit base and move left
2. Multiply digits in odd positions (from right) by 3 and digits in even positions by 1
3. Add the resulting values
4. Subtract the sum's last digit from 10
5. If the result is 10, use 0

### Manual Example

For GTIN-14 base `1031234567890`:

| Position (right to left) | Digit | Weight | Product |
| ------------------------ | ----- | ------ | ------- |
| 13                       | 1     | ×3     | 3       |
| 12                       | 0     | ×1     | 0       |
| 11                       | 3     | ×3     | 9       |
| 10                       | 1     | ×1     | 1       |
| 9                        | 2     | ×3     | 6       |
| 8                        | 3     | ×1     | 3       |
| 7                        | 4     | ×3     | 12      |
| 6                        | 5     | ×1     | 5       |
| 5                        | 6     | ×3     | 18      |
| 4                        | 7     | ×1     | 7       |
| 3                        | 8     | ×3     | 24      |
| 2                        | 9     | ×1     | 9       |
| 1                        | 0     | ×3     | 0       |

Sum = 97

Check digit = (10 - (97 % 10)) % 10 = 3

GTIN-14 = 10312345678903

## Python Code for GTIN-14 Calculation

```python
def calculate_gtin14_check_digit(gtin_base: str) -> str:
    """Calculates the GTIN-14 check digit from a 13-digit base string."""
    if len(gtin_base) != 13 or not gtin_base.isdigit():
        raise ValueError("Input must be a 13-digit numeric string.")

    total = 0
    for i, digit in enumerate(reversed(gtin_base)):
        weight = 3 if (i % 2 == 0) else 1
        total += int(digit) * weight

    check_digit = (10 - (total % 10)) % 10
    return str(check_digit)


def generate_gtin14(ndc10: str, packaging_indicator: str = '1') -> str:
    """Generates a GTIN-14 from a 10-digit NDC and a packaging indicator.

    The GTIN-14 is constructed as:
        [Indicator (1)] + [03 (2)] + [NDC-10 (10)] + [Check (1)] = 14 digits

    The '03' prefix is the GS1 pharmaceutical prefix: '0' is the standard
    GTIN-12 to GTIN-14 expansion digit, and '3' is the UPC Number System
    Character reserved for NDC products.
    """
    if len(ndc10) != 10 or not ndc10.isdigit():
        raise ValueError("NDC-10 must be exactly 10 digits (hyphens removed).")
    if len(packaging_indicator) != 1 or not packaging_indicator.isdigit():
        raise ValueError("Packaging indicator must be a single digit.")

    gtin_base = packaging_indicator + "03" + ndc10  # 1 + 2 + 10 = 13 digits
    check_digit = calculate_gtin14_check_digit(gtin_base)
    return gtin_base + check_digit  # 13 + 1 = 14 digits


# Example usage
ndc10 = "0409492134"  # Hospira NDC-10: 0409-4921-34 (4-4-2 format)
gtin14 = generate_gtin14(ndc10, packaging_indicator="1")
print("GTIN-14:", gtin14)  # Output: 10304094921348
```

## GTIN-14 Conversion Summary Table

| NDC-10     | Packaging Indicator | GTIN-14        |
| ---------- | ------------------- | -------------- |
| 0409492134 | 1                   | 10304094921348 |
| 1234567890 | 1                   | 10312345678903 |
| 1234567890 | 3                   | 30312345678907 |

## Packaging Hierarchy Example

All packaging levels for a single product share the same NDC-10. The packaging indicator and check digit change to produce unique GTIN-14 values at each level.

| Packaging Description  | Indicator | GTIN-14        |
| ---------------------- | --------- | -------------- |
| Base unit (GTIN-12)    | 0         | 00312345678906 |
| Single vial            | 1         | 10312345678903 |
| Carton (10 vials)      | 3         | 30312345678907 |

## Validation and Best Practices

If you are unsure about a product's NDC-10 value, always consult the FDA NDC Directory or reach out to the labeler directly. The NDC-10 printed on drug packaging (with hyphens) is the value you need—remove the hyphens and use all 10 digits.

Do not use NDC-11 to construct a GTIN. The NDC-11 format (5-4-2) is a HIPAA billing convention that pads a different segment depending on the original NDC format. The GTIN uses the raw NDC-10 with the fixed `03` prefix, which is a structurally different transformation.

## Conclusion

Converting NDCs to GTIN-14 is more than just formatting. It is a critical part of ensuring data integrity and regulatory compliance in the pharmaceutical supply chain. Always use the **10-digit NDC** as printed on the product label, apply the `03` prefix, select the correct packaging indicator, and validate the check digit using the Modulo 10 algorithm.

If you are building tools or systems that rely on accurate GTINs, consider integrating the validation logic into your pipeline to avoid downstream issues with serialization, track and trace, or barcoding compliance.

---

## References

* [RxTrace: How To Properly Define GTINs For Your NDCs (2017)](https://www.rxtrace.com/2017/03/how-to-properly-define-gtins-for-your-ndcs.html/)
* [RxTrace: Depicting An NDC Within A GTIN (2012)](https://www.rxtrace.com/2012/01/depicting-an-ndc-within-a-gtin.html/)
* [FDA NDC Directory](https://www.accessdata.fda.gov/scripts/cder/ndc/)
* [GS1 General Specifications](https://www.gs1.org/standards/gs1-general-specifications)
* [GS1 Check Digit Calculator](https://www.gs1.org/services/check-digit-calculator)
* [DSCSA Implementation Guidelines](https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa)
