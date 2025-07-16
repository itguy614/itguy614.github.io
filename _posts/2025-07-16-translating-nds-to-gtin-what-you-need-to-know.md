---
layout: post
menubar_toc: true
title: Translating NDC-10 and NDC-11 to GTIN-14
subtitle: What You Need to Know
author: Kurt Wolf
summary: |-
    Explains how to accurately convert National Drug Codes (NDC-10 and NDC-11) to GTIN-14 identifiers for use in GS1-compliant barcodes. It emphasizes the importance of using the officially assigned 11-digit NDC rather than inferring it from the 10-digit format. The article outlines the GTIN-14 structure, provides a detailed check digit calculation method, and includes Python code to automate the process. This guidance is essential for pharmaceutical serialization, traceability, and DSCSA compliance.
---
The National Drug Code (NDC) system is a foundational part of pharmaceutical identification in the United States. However, when it comes to global serialization and barcoding, especially for unit-level tracking under DSCSA or for GS1-compliant barcodes like DataMatrix, you will often encounter the GTIN-14 (Global Trade Item Number). This post clarifies how to convert NDCs to GTINs, and just as importantly, when not to.

## What is a GTIN-14

A GTIN-14 is a 14-digit identifier used globally to distinguish trade items. It is a requirement for GS1 barcodes and essential for encoding drug products in a way that supports traceability, recall execution, and global interoperability.

A GTIN-14 for a U.S. drug product typically includes:

1. A 1-digit Packaging Indicator (values 1 through 8 depending on the packaging hierarchy)
2. The NDC, represented in 11-digit format
3. A 1-digit Checksum, calculated using Modulo 10

## NDC Formats: 10 Digit vs 11 Digit

| Format | Description                          | Example      |
| ------ | ------------------------------------ | ------------ |
| NDC-10 | FDA-labeled format                   | 1234-5678-90 |
| NDC-11 | Normalized for databases and systems | 01234567890  |

The NDC-10 is commonly printed on drug packaging and can appear in one of three segment structures: 4-4-2, 5-3-2, or 5-4-1. NDC-11 is the normalized form where each segment is padded with leading zeros to produce a 5-4-2 structure.

**Important:** Do not translate a 10-digit NDC to an 11-digit format unless you are certain of the segment structure. Incorrect assumptions can result in the wrong product identifier. When building a GTIN, always use the officially assigned NDC-11 value from the labeler or a trusted database.

## Why You Should Not Automatically Convert NDC-10 to NDC-11

When generating GTINs, it is critical to use the correct 11-digit NDC as assigned by the labeler or as recorded in an authoritative source like the FDA NDC Directory. Manually converting a 10-digit NDC to 11 digits by guessing which segment needs zero-padding can result in an incorrect identifier. GTINs are used in serialization, verification, and compliance systems, where accuracy is essential.

Only the labeler or the official packaging database can confirm the correct mapping of an NDC-10 to an NDC-11.

## How to Convert NDC-11 to GTIN-14

Once you have the correct NDC-11, the process of creating a GTIN-14 is straightforward.

### Step-by-Step Instructions

1. Start with the NDC-11, such as `01234567890`
2. Add a 1-digit packaging indicator at the beginning, often `3` for unit-of-use products
3. Calculate the check digit using the GS1 Modulo 10 method
4. Concatenate the three parts to produce a valid GTIN-14

### Example

| Component           | Value         |
| ------------------- | ------------- |
| Packaging Indicator | 3             |
| NDC-11              | 01234567890   |
| Check Digit         | 6             |
| Final GTIN-14       | 3012345678906 |

## How the GTIN-14 Check Digit is Calculated

The check digit is the final digit in the GTIN-14. It is calculated using the GS1 Modulo 10 algorithm. This checksum helps detect data entry or scanning errors.

### Calculation Method

1. Start from the rightmost digit of the 13-digit base and move left
2. Multiply digits in odd positions by 3 and digits in even positions by 1
3. Add the resulting values
4. Subtract the sum's last digit from 10
5. If the result is 10, use 0

### Manual Example

For GTIN base `301234567890`:

| Position (right to left) | Digit | Weight | Product |
| ------------------------ | ----- | ------ | ------- |
| 13                       | 0     | x3     | 0       |
| 12                       | 9     | x1     | 9       |
| 11                       | 8     | x3     | 24      |
| 10                       | 7     | x1     | 7       |
| 9                        | 6     | x3     | 18      |
| 8                        | 5     | x1     | 5       |
| 7                        | 4     | x3     | 12      |
| 6                        | 3     | x1     | 3       |
| 5                        | 2     | x3     | 6       |
| 4                        | 1     | x1     | 1       |
| 3                        | 0     | x3     | 0       |
| 2                        | 0     | x1     | 0       |
| 1                        | 3     | x3     | 9       |

Sum = 94

Check digit = (10 - (94 % 10)) % 10 = 6

Final GTIN-14 = 3012345678906

## Python Code for GTIN-14 Calculation

```python
def calculate_gtin14_check_digit(gtin13: str) -> str:
    """Calculates the GTIN-14 check digit from a 13-digit input string."""
    if len(gtin13) != 13 or not gtin13.isdigit():
        raise ValueError("Input must be a 13-digit numeric string.")

    total = 0
    for i, digit in enumerate(reversed(gtin13)):
        weight = 3 if (i % 2 == 0) else 1
        total += int(digit) * weight

    check_digit = (10 - (total % 10)) % 10
    return str(check_digit)

def generate_gtin14(ndc11: str, packaging_indicator: str = '3') -> str:
    """Generates the full GTIN-14 given an 11-digit NDC and a packaging indicator."""
    if len(ndc11) != 11 or not ndc11.isdigit():
        raise ValueError("NDC-11 must be exactly 11 digits.")
    if len(packaging_indicator) != 1 or not packaging_indicator.isdigit():
        raise ValueError("Packaging indicator must be a single digit.")

    gtin13 = packaging_indicator + ndc11
    check_digit = calculate_gtin14_check_digit(gtin13)
    return gtin13 + check_digit

# Example usage
ndc11 = "01234567890"
gtin14 = generate_gtin14(ndc11)
print("GTIN-14:", gtin14)
```

## GTIN Conversion Summary Table

| NDC-11      | Packaging Indicator | GTIN-14       |
| ----------- | ------------------- | ------------- |
| 01234567890 | 3                   | 3012345678906 |
| 12345067890 | 1                   | 1123450678907 |
| 12345678900 | 3                   | 3123456789005 |

## Validation and Best Practices

If you are unsure about a product's segment structure or NDC-11 value, always consult the FDA NDC Directory or reach out to the labeler directly. Avoid using inferred or approximated values when building GTINs for compliance or inventory systems.

## Conclusion

Converting NDCs to GTIN-14 is more than just formatting. It is a critical part of ensuring data integrity and regulatory compliance in the pharmaceutical supply chain. Always use the proper 11-digit NDC, apply the correct packaging indicator, and validate the check digit using the Modulo 10 algorithm.

If you are building tools or systems that rely on accurate GTINs, consider integrating the validation logic into your pipeline to avoid downstream issues with serialization, track and trace, or barcoding compliance.

---

## References

* [FDA NDC Directory](https://www.accessdata.fda.gov/scripts/cder/ndc/)
* [GS1 General Specifications](https://www.gs1.org/standards/gs1-general-specifications)
* [GS1 Check Digit Calculator](https://www.gs1.org/services/check-digit-calculator)
* [DSCSA Implementation Guidelines](https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa)
