export const sqlLogic = `
    select distinct
        prod.certificatenum,
        prod.MIPolicyStatusType,
        ref.Voucher,
        ref.DisbursementNumber,
        ref.[Pymnt Date],
        ref.[Gross Amt],
        ref.[Reason Description]
    from BI_PRESENTATION.smsasdata.production as prod
        left join BI_PRESENTATION.PADExtract.PADReportData as ref  
            on prod.CertificateNum = ref.[Cert No.]
    where certificatenum in (
        '00000001',
        '00000002',
        '71079025'
    )
`;
