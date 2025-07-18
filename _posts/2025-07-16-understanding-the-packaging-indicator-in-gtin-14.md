---
layout: post
menubar_toc: true
title: 'Translating NDC-10 and NDC-11 to GTIN-14:  Understanding the Packaging Indicator in GTIN-14'
author: Kurt Wolf
summary: |-
    Understanding the packaging indicator in a GTIN-14 is essential for distinguishing pharmaceutical products across different packaging levels. From single-dose units to master cases, this leading digit encodes a product’s position in the packaging hierarchy—without changing its identity. Correct usage ensures seamless serialization, barcode accuracy, and DSCSA compliance. Whether labeling a vial or pallet, assigning the right packaging indicator is a small step with big implications for traceability and supply chain integrity.
---
When working with GTIN-14 values in pharmaceutical labeling or supply chain traceability, one of the most overlooked yet critical components is the **Packaging Indicator**—the first digit in the 14-digit GTIN. This digit helps differentiate between packaging levels in a product’s hierarchy and ensures that each packaging configuration can be uniquely identified and traced.

## What Is the Packaging Indicator

The packaging indicator, also known as the **indicator digit**, is the **first digit** of a GTIN-14. It does not change the identity of the product itself (which is determined by the NDC portion) but instead identifies the **level of packaging**.

This is especially important in pharmaceutical environments where unit-of-use items, cartons, cases, and pallets must each carry a unique GTIN for DSCSA compliance, RFID tagging, inventory management, and serialization.

## Common Packaging Indicator Values

| Indicator Digit | Packaging Level             | Use Case Example                               |
| --------------- | --------------------------- | ---------------------------------------------- |
| `0`             | Not valid for GTIN-14       | Used only to convert GTIN-12/GTIN-8 internally |
| `1`             | Base level (unit of use)    | Single vial, syringe, or blister pack          |
| `2`             | Inner pack                  | Box of 5 vials                                 |
| `3`             | Carton or mid-level package | Carton of multiple inner packs                 |
| `4` to `8`      | Higher-level packaging      | Master case, outer case, pallet                |
| `9`             | Variable measure trade item | Items sold by weight, volume, or length        |

> Indicator `0` is not used for newly assigned GTIN-14s. It is reserved for internal expansion of shorter GTINs.

## Selecting the Right Packaging Indicator

Selecting the correct packaging indicator is **not arbitrary**. It should reflect the item's position in the packaging hierarchy:

1. Use `1` for the **lowest-level saleable unit**.
2. Assign `2`, `3`, `4`, etc. for each higher-level packaging tier.
3. All levels must share the **same product identifier** (such as the NDC-11) but differ in the indicator digit and check digit.
4. Ensure consistency between packaging documentation and labeling systems.

If multiple units contain the same product but are packaged differently, each package type must be assigned a **unique GTIN-14** using a different indicator digit.

### Example: Packaging Hierarchy for a Single NDC

| Packaging Description  | Indicator | GTIN-14       |
| ---------------------- | --------- | ------------- |
| Single vial            | `1`       | 1012345678903 |
| Box of 10 vials        | `3`       | 3012345678906 |
| Master case (10 boxes) | `5`       | 5012345678900 |

All three examples use the same base NDC-11: `01234567890`, but differ by packaging indicator and check digit.

## Why It Matters

The packaging indicator is essential for:

* **Regulatory compliance**, including DSCSA and global UDI systems
* **Serialization and track-and-trace** solutions
* **RFID or barcode labeling** for inventory control
* **Avoiding duplication or confusion** between different package types

Systems that ignore or misassign packaging indicators risk mismatched scans, rejected shipments, and failed compliance audits.

## Best Practices

* Define your packaging hierarchy early in the product lifecycle
* Document indicator assignments clearly and consistently
* Validate with your GS1 company prefix and check digit calculation
* Coordinate with manufacturing, logistics, and IT to ensure system-wide consistency

## Conclusion

The packaging indicator in a GTIN-14 is a simple concept with powerful implications. By thoughtfully assigning and maintaining it, pharmaceutical manufacturers and supply chain partners can ensure accurate tracking, clear differentiation between package levels, and full regulatory compliance.

---

## References

* [GS1 General Specifications](https://www.gs1.org/standards/gs1-general-specifications)
* [GS1 Healthcare GTIN Allocation Rules](https://www.gs1.org/industries/healthcare/gtin-allocation-rules)
* [FDA DSCSA Overview](https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa)
* [GS1 Application Identifiers and Barcoding](https://www.gs1.org/standards/barcodes)
