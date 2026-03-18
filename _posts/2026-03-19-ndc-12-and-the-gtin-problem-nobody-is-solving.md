---
layout: post
menubar_toc: true
title: 'NDC 12 and the GTIN Problem Nobody Is Solving'
subtitle: The Decoupling of Drug Identifiers and the Data Gap It Creates
author: Kurt Wolf
summary: |-
    The FDA's final rule on NDC 12 doesn't just change a code format—it breaks the structural relationship between the National Drug Code and the GTIN-14 used across the pharmaceutical supply chain. For decades, the NDC has been embedded directly inside the GTIN using the GS1 pharmaceutical prefix "03". With a 12-digit NDC, that embedding is no longer possible. GS1's new Application Identifier 715 provides a way to carry both identifiers in a barcode, but the deeper problem remains: there is no public, authoritative database mapping GTINs to NDCs. This post explains the technical details of the GTIN-14 structure, why NDC 12 breaks it, and why the resulting data gap is a problem the industry has yet to address.
tags: NDC GTIN GS1 FDA DSCSA barcode
---

In the [previous post](/2026/fda-finalizes-ndc-12-what-it-means), we covered the FDA's final rule on NDC 12 and its broad implications for pharmacists, consumers, and supply chain systems. In this post, we go deeper into one specific consequence that has not received enough attention: **the structural decoupling of the NDC from the GTIN, and the data gap it creates**.

This is not a theoretical concern. Every system that currently derives an NDC from a GTIN—or constructs a GTIN from an NDC—will break. And there is no public solution in place to fill the gap.

## How the GTIN-14 Works Today

To understand what breaks, you first need to understand how the GTIN-14 is built for U.S. pharmaceutical products.

A GTIN-14 is exactly **14 digits**. For drugs marketed in the United States, it follows a specific structure rooted in the GS1 system:

```
GTIN-14 = [Indicator] + [0] + [3] + [NDC-10] + [Check Digit]
              1 digit    1     1     10 digits     1 digit     = 14 digits
```

### Where the "03" Comes From

The `3` in position three is the **UPC Number System Character** reserved by GS1 for NDC products. When a pharmaceutical manufacturer registers with GS1 US, their GS1 Company Prefix is structured to incorporate this `3` along with their FDA labeler code. The `0` in position two is the standard expansion digit used when converting a 12-digit UPC (GTIN-12) to a 14-digit GTIN-14.

This means you can construct a GTIN-12 (UPC-A barcode) for any U.S. drug product with a simple formula:

```
GTIN-12 = [3] + [NDC-10] + [Check Digit]
```

And expand it to a GTIN-14 by prepending a packaging indicator and the expansion zero:

```
GTIN-14 = [Indicator] + [0] + [GTIN-12 without check] + [new Check Digit]
         = [Indicator] + [0] + [3] + [NDC-10] + [Check Digit]
```

For a detailed walkthrough of this construction, including Python code and the Modulo 10 check digit algorithm, see [From NDC-10 to GTIN-14: What You Need to Know](/2025/translating-nds-to-gtin-what-you-need-to-know).

### A Concrete Example

Take the Hospira product with NDC-10 `0409-4921-34`:

| Component | Value |
| --- | --- |
| Packaging Indicator | 1 |
| GS1 Prefix | 03 |
| NDC-10 | 0409492134 |
| Check Digit | 8 |
| **GTIN-14** | **10304094921348** |

The NDC is embedded directly in positions 4 through 13. Any system that knows the GTIN can extract the NDC by stripping the indicator, the `03` prefix, and the check digit. This algorithmic derivability is what has made the current system work without a centralized cross-reference database.

### A Common Misconception: NDC-11 in GTINs

It is worth noting that many industry sources—and an earlier version of this blog—incorrectly describe the GTIN-14 as `Indicator + NDC-11 + Check Digit`. This formula produces only 13 digits (1 + 11 + 1) and uses the wrong input. The GTIN is built from the **raw 10-digit NDC** with the fixed `03` prefix, not from the 11-digit HIPAA-normalized format. The NDC-11 (5-4-2) is a billing convention; the GTIN uses a structurally different transformation. See our [corrected conversion guide](/2025/translating-nds-to-gtin-what-you-need-to-know) for full details.

## Why NDC 12 Breaks This

The NDC-12 format is **6-4-2**: a 6-digit labeler code, 4-digit product code, and 2-digit package code, totaling 12 digits.

Let's try to fit it into the GTIN-14:

```
[Indicator (1)] + [03 (2)] + [NDC-12 (12)] + [Check (1)] = 16 digits
```

That is **two digits too many**. The `03` prefix plus the NDC-12 alone already consumes 14 digits, leaving no room for the indicator or check digit.

What about dropping the `03` prefix?

```
[Indicator (1)] + [NDC-12 (12)] + [Check (1)] = 14 digits
```

The math works, but the result is useless. Without the `03` prefix, the GTIN no longer self-identifies as a pharmaceutical product. The leading digits of the NDC-12's labeler code would fall into GS1 Company Prefix space potentially allocated to other companies. There is no way for a scanning system to look at this GTIN and know it contains an NDC.

**The embedding is broken in both directions:**

* You cannot construct a GTIN-14 from an NDC-12
* You cannot derive an NDC-12 from a GTIN-14

The two identifiers must become **fully independent**.

## The Solution: AI (715) and Separate Data Elements

GS1 addressed this by introducing **Application Identifier 715** (formalized in [GSCN 21-289](https://www.gs1.org/docs/barcodes/GSCN_21-289_US_FDA_NHRN.pdf)), which encodes the NDC as a standalone data element in a barcode alongside the GTIN.

Under the new model, a GS1 DataMatrix barcode carries both identifiers as separate fields:

| AI | Purpose | Example |
| --- | --- | --- |
| (01) | GTIN-14 | 10312345678903 |
| (715) | NDC-12 | 012345-6789-01 |
| (21) | Serial number | ABC123 |
| (10) | Lot/batch | LOT456 |
| (17) | Expiration date | 261231 |

The GTIN remains the globally unique trade item identifier. The NDC remains the FDA drug identifier. They travel together in the barcode but are no longer structurally related.

This is architecturally cleaner. But it introduces a problem that the embedded model never had.

## The Data Gap

When the NDC was embedded inside the GTIN, the mapping between the two was **algorithmic**. Any system with a GTIN could extract the NDC. Any system with an NDC-10 could construct the GTIN. No external lookup was required.

With NDC-12 and AI (715), the mapping between a GTIN and its corresponding NDC becomes a **data management problem**. You need an authoritative source that says "this GTIN corresponds to this NDC." And right now, **no such public source exists**.

### What Exists Today

| Source | Has GTINs? | Has NDCs? | Public? | Notes |
| --- | --- | --- | --- | --- |
| **OpenFDA NDC API** | No | Yes | Yes | Has a `upc` field (GTIN-12) but it is inconsistently populated and does not include GTIN-14 |
| **FDA NDC Directory** | No | Yes | Yes | No GTIN data at all |
| **DailyMed (NIH)** | No | Yes | Yes | FDA will update for NDC-12 searchability, but no GTIN data |
| **GS1 GDSN** | Yes | Yes | No | B2B subscription network; requires data pool membership |
| **GS1 US Data Hub** | Partial | No | Limited | Can look up basic info by GTIN (30 free queries/day); does not expose NDC associations |
| **Verified by GS1** | Partial | No | Limited | Global lookup; returns company and brand info only |
| **First Databank (FDB)** | Unknown | Yes | No | Commercial drug knowledge base; GTIN cross-referencing not documented |
| **Medi-Span** | Unknown | Yes | No | Commercial drug database; no public GTIN mapping |

None of these provide a comprehensive, public, authoritative GTIN-to-NDC mapping.

### What the FDA Has Committed To

The FDA's final rule states that the agency will publish a **10-digit to 12-digit NDC mapping database** and coordinate with NIH's DailyMed to support searchability in both formats. This is an NDC-to-NDC mapping. It does not address GTIN.

The FDA does not require manufacturers to register their GTINs. There is no DSCSA requirement for a centralized GTIN-to-NDC registry. Manufacturers are required to share GTIN master data with **direct trading partners** through EPCIS transaction data, but this is a B2B obligation—not a public data source.

### What GS1 Has Said

GS1 US has acknowledged that the [direct relationship between GTIN and NDC will no longer exist](https://downloads.regulations.gov/FDA-2021-N-1351-0036/attachment_1.pdf) under the new format. Their response was to create AI (715) for encoding the NDC in barcodes. But GS1 has not announced plans to publish a public GTIN-to-NDC cross-reference database.

## Why This Matters

The lack of a public mapping creates real problems:

**For distributors and wholesalers:** Warehouse management systems that scan a GTIN and look up the corresponding NDC for regulatory reporting, chargebacks, or rebate processing will need a mapping table. Where does it come from? Each manufacturer, individually, through GDSN or direct communication.

**For pharmacies:** Pharmacy management systems, automated dispensing cabinets, and formulary databases often key on NDC. When a product arrives with a barcode containing a GTIN and a separate NDC via AI (715), the systems need to associate these values. During the transition, some products will carry embedded GTINs (old model) while others carry decoupled GTINs (new model). Systems must handle both.

**For healthcare IT vendors:** EHR, ERP, and claims processing systems that derived NDC from GTIN will need to maintain their own mapping tables or subscribe to commercial data feeds. This adds cost and complexity—and introduces a new failure mode if the mapping data is stale or incomplete.

**For regulators and public health:** The FDA's ability to trace drugs through the supply chain depends on consistent, accurate identification. A fragmented landscape of proprietary GTIN-NDC mappings, with no single source of truth, is a step backward for transparency.

## Who Should Be Solving This?

There are a few candidates, and none have stepped forward:

**The FDA** could expand the NDC Directory to include GTIN associations. They already collect product data from manufacturers during drug listing. Adding a GTIN field to the listing submission would create the mapping at the source. But the FDA has not indicated any plans to do this.

**GS1 US** operates the Data Hub and could build a public cross-reference as a natural extension of their registry. They have the infrastructure and the data (through GDSN). But their current model is B2B subscription-based, and there is no indication they plan to make pharmaceutical GTIN-NDC mappings freely accessible.

**OpenFDA** could add GTIN-14 fields to its drug APIs. The existing `openfda.upc` field shows that the concept is not foreign to the platform—it just needs to be expanded and consistently populated. This would be the lowest-friction path for developers and healthcare IT systems.

**Commercial data vendors** (FDB, Medi-Span, Cerner Multum) will likely fill the gap for their subscribers. But this creates a pay-to-play landscape where accurate drug identification depends on which data feed you can afford.

## What You Should Be Doing Now

If you operate systems that rely on the GTIN-NDC relationship:

✔️ **Identify every point where your systems derive NDC from GTIN** (or vice versa). These are your break points.

✔️ **Start building a GTIN-to-NDC mapping table** from your existing transaction data. The current embedded model lets you generate these mappings algorithmically—do it now while you still can.

✔️ **Engage your GDSN data pool** or trading partners about how they plan to distribute GTIN-NDC associations for NDC-12 products.

✔️ **Monitor OpenFDA and the FDA NDC Directory** for any expansion of data fields. If the FDA adds GTIN to the listing process, it will likely happen during the 7-year preparation period.

✔️ **Budget for commercial data feeds** if your organization cannot source mappings through direct trading partner relationships.

✔️ **Plan for dual-mode processing** during the transition: some products with embedded GTINs (old model), others with decoupled GTINs plus AI (715).

## Final Thoughts

The NDC-12 format change is necessary and overdue. The decoupling of NDC from GTIN is architecturally sound. But the industry has spent decades relying on an algorithmic relationship between these two identifiers, and **nobody has stepped up to replace it with a public data solution**.

GS1 US has [described this transition](https://downloads.regulations.gov/FDA-2021-N-1351-0036/attachment_1.pdf) as a pharmaceutical Y2K event. That comparison is apt—not because of the technical complexity, but because the real risk is in the assumptions we have not yet examined.

The seven-year preparation window gives us time. But the clock is ticking, and the data gap is not going to solve itself.

---

## References

* [Federal Register: Final Rule — Revising the NDC Format (2026-04368)](https://www.federalregister.gov/documents/2026/03/05/2026-04368/revising-the-national-drug-code-format-and-drug-label-barcode-requirements)
* [GS1 US Comment to FDA on NDC Format (FDA-2021-N-1351-0036)](https://downloads.regulations.gov/FDA-2021-N-1351-0036/attachment_1.pdf)
* [GS1 GSCN 21-289: AI (715) for US NDC](https://www.gs1.org/docs/barcodes/GSCN_21-289_US_FDA_NHRN.pdf)
* [GS1 AI Reference: AI (715)](https://www.gs1.org/standards/barcodes/application-identifiers/715)
* [RxTrace: How To Properly Define GTINs For Your NDCs](https://www.rxtrace.com/2017/03/how-to-properly-define-gtins-for-your-ndcs.html/)
* [RxTrace: Depicting An NDC Within A GTIN](https://www.rxtrace.com/2012/01/depicting-an-ndc-within-a-gtin.html/)
* [OpenFDA Drug NDC API](https://open.fda.gov/apis/drug/ndc/)
* [FDA NDC Directory](https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory)
* [GS1 GDSN Overview](https://www.gs1.org/standards/gdsn)
* [GS1 US Data Hub](https://www.gs1us.org/tools/gs1-us-data-hub)
* [FDA DSCSA Overview](https://www.fda.gov/drugs/drug-supply-chain-security-act-dscsa)
