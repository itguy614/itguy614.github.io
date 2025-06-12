---
layout: post
menubar_toc: true
title: Demystifying NDC Codes
subtitle: Past, Present, and What’s Next
author: Kurt Wolf
summary: |-
    As the U.S. drug supply chain grows more automated, the FDA is proposing a shift from the current 10- and 11-digit National Drug Code (NDC) formats to a standardized 12-digit structure. This change is driven by the looming exhaustion of 5-digit labeler codes and aims to enhance clarity, automation, and long-term sustainability. NDC 12 adopts a fixed 6-4-2 segment format, enabling better compatibility with GS1 standards, improved barcode readability, and seamless integration with traceability systems. The transition, expected to begin in 2025, will impact barcoding, GTINs, and data processing systems-requiring healthcare organizations to start preparing now.
---

The **National Drug Code (NDC)** is the universal identifier for drugs marketed in the United States. As healthcare systems become more automated and supply chains increasingly digitized, the structure and consistency of this code matter more than ever.

But there’s a major shift coming-one driven not just by technology, but by **necessity**.

In this post, we’ll walk through:

* What the current NDC formats are (10-digit and 11-digit)
* Why NDC 12 is being proposed-and why it matters
* How barcodes and GTINs are impacted
* What the **FDA**, **GS1**, and the industry are doing to prepare

## NDC 10: The Legacy Format (And Its Pitfalls)

The traditional **10-digit NDC** has a variable format:

* Labeler (4 or 5 digits)
* Product (3 or 4 digits)
* Package (1 or 2 digits)

Examples:

* `1234-5678-90`
* `12345-678-90`
* `12345-6789-0`

![https://www.fda.gov/drugs/drug-approvals-and-databases/proposed-rule-revising-national-drug-code-format!](https://www.fda.gov/files/OC_NDCExplained_Current_900x500_220714.png)

**Why it's a problem:**

* Format isn’t fixed-segment lengths vary
* Leads to **ambiguity** when systems remove hyphens
* **Barcode readers scanning a 10-digit NDC may return a non-unique value**, since it’s unclear how to interpret the segments without context

## NDC 11: A Temporary Solution

To support billing, barcoding, and automated processing, many systems adopted the **11-digit NDC**, using a standard **5-4-2 segment structure**. The original 10-digit NDC is converted by **padding** the appropriate segment with leading zeroes.

| Original NDC | Format | NDC 11 Equivalent |
| ------------ | ------ | ----------------- |
| 1234-5678-90 | 4-4-2  | **0**1234-5678-90     |
| 12345-678-90 | 5-3-2  | 12345-**0**678-90     |
| 12345-6789-0 | 5-4-1  | 12345-6789-**0**0     |

> ⚠️ Converting to NDC 11 requires **knowing the original segment configuration**, which is not always available-making this a workaround, not a long-term fix.

## NDC 12: The FDA’s Proposed Future

On **July 25, 2022**, the **FDA published a proposed rule** to revise the NDC format to **12 digits** using a uniform structure:

> **6-digit labeler** – **4-digit product** – **2-digit package**
>> Example: `123456-7890-12`

![https://www.fda.gov/files/OC_NDCExplained_Proposed_500x500_220714.png!](https://www.fda.gov/files/OC_NDCExplained_Proposed_500x500_220714.png)

[FDA Proposed Rule – Revising the National Drug Code Format](https://www.fda.gov/drugs/drug-approvals-and-databases/proposed-rule-revising-national-drug-code-format)

### Why NDC 12?

The shift is being driven by a critical issue:

> **The FDA is running out of 5-digit labeler codes.**

* According to the proposal, if no change is made, **available labeler codes will be exhausted by 2035**.
* Labeler codes are **FDA-assigned**, and once a 5-digit range is fully allocated, it’s unavailable for reuse-limiting new market entries.

With a **6-digit labeler** in NDC 12, the FDA increases the number of possible labeler codes **tenfold**, enabling long-term sustainability and improved standardization.

### Benefits of NDC 12:

* Fixed-length format: **no ambiguity, no padding needed**
* Fully machine-readable: supports automation, scanning, and serialization
* Backward compatibility planned: 10- and 11-digit legacy codes can be mapped
* Allows GS1-compliant labeling, serialization, and traceability

## Implications for Barcoding and GTINs

Most pharmaceutical barcodes today use the **Global Trade Item Number (GTIN)**, which embeds the NDC (typically NDC 11) as part of the 14-digit number.

### Current Practice:

* GTIN-14 = `0 + NDC11 + check digit`
* Embedded via GS1 AI **(01)**

### With NDC 12:

* Systems will need to accommodate **12-digit NDCs**, either as part of a **modified GTIN strategy** or separately

To help with this, **GS1 has proposed a new Application Identifier**:

| AI  | Purpose          | Format    |
| --- | ---------------- | --------- |
| 01  | GTIN             | 14 digits |
| 714 | **NDC-12** (new) | 12 digits |

This new AI (714) would allow systems to **carry NDC-12 directly** alongside the GTIN, improving traceability, auditing, and serialization.

> **Note:** This will affect barcode label generation, AIDC systems, and downstream integrations like EHRs, ERP systems, and pharmacy management platforms.

## Key Dates and Timeline

According to the FDA’s proposal:

* **Final rule is expected in 2025**
* **Transition period** will allow continued use of NDC 10 and NDC 11
* Full adoption of NDC 12 will be **mandatory for new assignments only**
* Legacy codes will not be converted-but mapping guidance will be provided

The FDA encourages system owners to begin **technical assessments and vendor outreach** now to prepare for implementation.

## What You Should Be Doing Now

✔️ **Inventory your systems**: Where is the NDC stored, displayed, or processed?

✔️ **Identify assumptions**: Do any components assume fixed segment lengths or NDC 11?

✔️ **Plan for dual support**: Ensure your systems can handle both legacy and NDC 12 formats

✔️ **Coordinate with vendors**: Barcode software, ERP, and EDI platforms will all be impacted

✔️ **Monitor GS1 AI updates**: Add support for AI **(714)** to future-proof barcode parsing

---

## Final Thoughts

NDC 12 isn’t just about better technology-it’s about **keeping the U.S. drug identification system sustainable**. With the current format nearing exhaustion and automation becoming critical to patient safety, the FDA’s proposal represents a necessary modernization.

By embracing this change early, organizations can ensure **barcode integrity**, **traceability**, and **compliance** across the full pharmaceutical supply chain.
