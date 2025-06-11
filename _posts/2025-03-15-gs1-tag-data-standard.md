---
layout: post
menubar_toc: true
series: rfid_blog_series
hero_image: /assets/images/rfid-blog-series-hero.png
hero_darken: true
title: GS1 Tag Data Standard (TDS) for Unit-of-Use Pharmaceuticals
subtitle: A Primer on EPC 1.x and 2.x Encoding Formats
summary: |-
    As pharmaceutical supply chains shift toward unit-level traceability under regulations like DSCSA and the FMD, the structure of RFID-encoded drug data is becoming crucial. This post explains how GS1's EPC encoding formats—SGTIN-96, SGTIN-96+, and SGTIN-198—impact drug serialization and compliance. While SGTIN-96 requires external databases, SGTIN-96+ adds expiration and lot number data to user memory for offline verification. However, EPC 2.x’s SGTIN-198 format fully embeds all critical data within the tag itself, offering the most standardized, compliant, and future-ready solution. For long-term interoperability and regulatory alignment, EPC 2.x is the recommended path forward.
tags: GS1 RFID TDS EPC
---
As **pharmaceutical supply chains move toward full electronic traceability**, **unit-of-use drug identification** has become a critical focus under regulations like the **Drug Supply Chain Security Act (DSCSA)** in the U.S. and the **Falsified Medicines Directive (FMD)** in the EU.

The **GS1 Tag Data Standard (TDS)** defines how **Electronic Product Codes (EPCs)** are structured on **RFID tags**, ensuring **standardized, interoperable, and efficient drug tracking** at the individual **unit-of-use level** (i.e., the smallest saleable package of a drug, such as a vial, syringe, or blister pack).

This document provides a **primer on EPC 1.x and 2.x encoding formats** for **unit-of-use pharmaceutical tagging**, explaining **how GTIN, serial numbers, expiration dates, and lot numbers are structured** and why **EPC 2.x is the preferred format for future compliance**.

## GS1 EPC Encoding for Unit-of-Use Pharmaceuticals

GS1 defines **two primary encoding versions** for **unit-of-use drug identification**:

1. **EPC 1.x** (Older, widely adopted but traditionally database-dependent)
2. **EPC 2.x** (Enhanced, self-contained, and future-proofed for compliance)

Each version specifies **how product data is encoded on RFID tags**, impacting **real-time verification, regulatory compliance, and supply chain interoperability**.

## 1. EPC 1.x Encoding for Unit-of-Use Drugs

EPC 1.x formats provide **basic serialization** for pharmaceuticals, but they **lack embedded expiration and lot number details in the standard EPC memory**, requiring **external databases for full drug identification**[1].

However, an **enhanced approach**, **SGTIN-96+**, allows **expiration and lot number storage in the tag’s user memory**, addressing this limitation.

### SGTIN-96 (Serialized GTIN)

- **Format:** 96-bit EPC
- **Data Encoded in EPC Memory:**
    - **GTIN (Global Trade Item Number, 14 digits)**
    - **Unique Serial Number (38-bit)**
- **How it Works:**
    - The **GTIN identifies the drug product** (e.g., a 50mg vial of a specific medication).
    - The **serial number uniquely identifies each unit** of that product.
    - **Expiration date and lot number are NOT stored in EPC memory**—they must be retrieved via an external system[2].

#### Limitations of Standard SGTIN-96 for Pharmaceuticals

✔ **Provides unique serialization for each unit**

✖ **Requires database lookup to retrieve expiration date and lot number**

✖ **Slower authentication in offline scenarios**

✖ **Less efficient for DSCSA and FMD compliance**

### SGTIN-96+ (SGTIN-96 with Additional Data in User Memory)

To address **SGTIN-96’s limitations**, **SGTIN-96+** extends the standard EPC by **storing additional drug details in the tag’s user memory**[3].

- **Format:** 96-bit EPC + Additional Data in User Memory
- **Data Encoded in EPC Memory:**
    - **GTIN**
    - **Serial Number**
- **Data Encoded in User Memory (UM):**
    - **Expiration Date (YYYYMMDD format)**
    - **Lot Number**
    - **Optional Additional Regulatory Data**

#### How SGTIN-96+ Improves Pharmaceutical Tracking

✔ **Enables full offline verification**—expiration and lot number are available without database lookups.

✔ **Improves DSCSA compliance** by **eliminating third-party system reliance**.

✔ **Maintains backward compatibility** with existing **SGTIN-96 RFID readers** while adding user memory functionality[4].

While **SGTIN-96+ is a significant improvement**, it **does not provide as much standardization as EPC 2.x** since **user memory formatting can vary between implementations**.

## 2. EPC 2.x Encoding for Unit-of-Use Drugs

EPC 2.x encoding formats were introduced to **address the shortcomings of EPC 1.x**, providing **full serialization and product traceability within the EPC memory itself**, without reliance on **user memory or external databases**.

### SGTIN-198 (Serialized GTIN with Full Drug Data)

- **Format:** 198-bit EPC
- **Data Encoded:**
    - **GTIN (Global Trade Item Number, 14 digits)**
    - **Unique Serial Number (Up to 88-bit)**
    - **Expiration Date (20-bit, YYYYMMDD format)**
    - **Batch/Lot Number (Up to 60-bit)**

### Comparison: SGTIN-96 vs. SGTIN-96+ vs. SGTIN-198

| Feature                  | **SGTIN-96 (EPC 1.x)**                    | **SGTIN-96+ (EPC 1.x w/UM)**           | **SGTIN-198 (EPC 2.x)**                          |
| ------------------------ | ----------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| **GTIN**                 | ✅ Stored in EPC                           | ✅ Stored in EPC                        | ✅ Stored in EPC                                  |
| **Serial Number**        | ✅ Stored in EPC                           | ✅ Stored in EPC                        | ✅ Stored in EPC                                  |
| **Expiration Date**      | ❌ Not stored (Database lookup required)   | ✅ Stored in user memory                | ✅ Stored in EPC                                  |
| **Lot Number**           | ❌ Not stored (Database lookup required)   | ✅ Stored in user memory                | ✅ Stored in EPC                                  |
| **Compliance Readiness** | ⚠️ DSCSA-compliant but database-dependent | ✅ DSCSA-ready with embedded lot/expiry | ✅ Fully DSCSA-compliant with structured EPC data |
| **Interoperability**     | ⚠️ Requires proprietary system lookup     | ⚠️ Depends on UM formatting standards  | ✅ Universally readable by GS1-compliant systems  |

SGTIN-96+ provides **a practical improvement over SGTIN-96**, but **SGTIN-198 is the superior solution** for **global compliance and future scalability**.

---

## Conclusion

SGTIN-96+ offers **a short-term solution** by storing **expiration and lot number in user memory**, removing **database reliance**. However, for **long-term compliance and interoperability**, **SGTIN-198 (EPC 2.x) is the superior choice**[5].

By **adopting EPC 2.x encoding**, pharmaceutical companies can ensure:

✔ **Seamless DSCSA compliance**

✔ **Faster, offline drug verification**

✔ **Improved security and anti-counterfeiting measures**

✔ **Future-proofed track-and-trace capabilities**

---

## Footnotes

1. GS1. "Tag Data Standard (TDS) for Pharmaceuticals." _GS1.org_, [https://www.gs1.org/standards/tds](https://www.gs1.org/standards/tds)

2. U.S. Food & Drug Administration. "DSCSA Serialization Requirements." _FDA.gov_, [https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa](https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa)

3. RAIN RFID Alliance. "Optimizing RFID Tag Memory for Pharmaceuticals." _RAINRFID.org_, [https://rainrfid.org](https://rainrfid.org/)

4. GS1 Healthcare. "EPC 2.x: Enabling Serialized Track-and-Trace for Pharmaceuticals." _GS1 Healthcare Report_, [https://www.gs1.org/industries/healthcare](https://www.gs1.org/industries/healthcare)

5. Fresenius Kabi Plus RFID Program. "Unit-Level RFID in Pharmaceuticals." _PlusRFID.com_, [https://www.plusrfid.com/about](https://www.plusrfid.com/about)
