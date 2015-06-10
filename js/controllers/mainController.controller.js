angular.module('stockSearch').controller('mainController', ['$scope', '$http', '$location', '$compile', '$anchorScroll', '$filter', '$timeout', function ($scope, $http, $location, $compile, $anchorScroll, $filter, $timeout) {
    
    'use strict';
    
    $scope.dynamic = 0; // position of progress bar
    $scope.max = 8; // max progress bar length
    $scope.loaded = false;
    $scope.loading = 0;
    $scope.trueChange = '';
    $scope.counter = 0;
    $scope.btnName = 'Load Data';
    $scope.scroll_id = '';
    $scope.responseJSON_nas1 = [];
    $scope.responseJSON_nas2 = [];
    $scope.responseJSON_nas3 = [];
    $scope.responseJSON_nas4 = [];
    $scope.responseJSON_nas5 = [];
    $scope.responseJSON_nas6 = [];
    $scope.responseJSON_nas7 = [];
    $scope.responseJSON_nas8 = [];
    $scope.out = '';
    $scope.out_comp = '';
    $scope.status_nasdaq = [];
    $scope.nasdaq = [
            "'ZNGA','ZUMZ','ZU','ZSPH','ZSAN','ZGNX','ZIXI','ZIOP','ZIONZ','ZIONW','ZION','ZNWAA','ZN','Z','ZHNE','ZLTQ','ZBRA','ZAZA','ZAIS','ZAGG','ZFGN','YY','YRCW','YOD','YDLE','YNDX','YHOO','XNET','XTLB','XPLR','XOOM','XOMA','XLNX','XGTIW','XGTI','XNPT','XENE','XBKS','XNCR','XCRA','XBIT','WYNN','WVFC','WSCI','WSFSL','WSFS','WMGIZ','WMGI','WPPGY','WPCS','WOWO','WRLD','WWD','WBKC','WLRHW','WLRHU','WLRH','WIX','DXPS','DGRS','DGRW','CRDT','GULF','DXKW','JGBB','DXJS','WETF','DXGE','DGRE','EMCB','EMCG','CHXF','HYZD','HYND','AGZD','AGND','WTFCW','WTFC','WINA','WIN','WIBC','WLFC','WLDN','WVVI','WHLM','WILN','WFM','WHFBL','WHF','WHLRW','WHLRP','WHLR','WEYS','WPRT','WLB','WFD','WDC','WSTL','WBB','WABC','WMAR','WSTC','WTBA','WSBC','WERN','WEN','WEBK','WB','WBMD','WWWW','WDFC','WSTG','WAYN','WAVX','WSBF','WFBI','WASH','WAFDW','WAFD','WRES','WBA','WGBS','VWR','VUZI','VSEC','VRNGW','VRNG','VOXX','VLTC','VOD','VVUS','VTL','VTAE','VISN','VRTU','VRTS','VSCP','VIRT','VA','VIRC','VNOM','VIP','VIMC','VLGEA','VBFC','VKTX','VGGL','VDTH','VIDI','VUSE','VBND','VICR','VICL','VSAT','VIAB','VIA','VRTB','VRTA','VRTX','VTNR','VSAR','VRML','VBTX','VRSK','VRSN','VRNT','VCEL','VSTM','VCYT','VRA','APPY','VIIX','VIIZ','XIV','ZIV','TVIX','TVIZ','USLV','UGLD','DSLV','VECO','WOOF','VBIV','VASC','VBLT','VDSI','VRNS','VPCO','VXUS','BNDX','VTIP','VGSH','VCSH','VTHR','VTWV','VTWG','VTWO','VONV','VONG','VONE','VNRCP','VNRBP','VNRAP','VNR','VMBS','VGLT','VCLT','VCIT','VGIT','VNQI','VWOB','VNDA','VALU','VLYWW','VYFC','VALX','VLRX','UTSI','UTIW','UTMD','USMD','USAK','USATP','USAT','ECOL','URBN','URRE','UPLD','UPIP','UVSP','UACL','USAP','UFPI','UEIC','OLED','UNTY','UG','UTHR','USLM','USBI','UBFO','UNTD','UNFI','UIHC','UFCS','UBNK','UDF','UCFC','UCBI','UCBA','UBSI','UBOH','UBCP','QURE','UNXL','UNB','UBSH','UNIS','UNAM','UMPQ','UMBF','UTEK','ULTR','ULBI','RARE','UCTT','ULTA','UFPT','UBNT','UBIC','UREE','GROW','USEG','PRTS','USCR','TRCB','TWIN','FOXA','FOX','TUTT','HEAR','TOUR','TUES','TCX','TUBE','TTMI','TSRI','TRMK','TRST','THST','TRUE','TROVW','TROVU','TROV','TRIV','TBK','TSC','TRIP','TRIB','TRMB','TRS','TRIL','TCBK','TRVN','TZOO','TTHI','TGA','TBIO','TRNS','TACT','TWMC','TSRE','TSCO','TCON','TOWN','CLUB','TWER','TW','TSEM','TRNX','TRCH','TORM','TOPS','TISA','TNXP','TKAI','TBRA','TIVO','TITN','TIPT','TSBK','TIL','TTS','TIGR','TICC','THTI','THLD','THOR','TCRD','TST','THRX','TBPH','NCTY','YORW','ULTI','SPNC','PRSC','PCLN','STKS','NAVG','NDAQ','MIDD','MIK','MDCO','MSG','KEYW','JYNT','INTG','CUBA','HAIN','HCKT','HABT','GT','TFM','FLIC','FBMS','FINL','XONE','ENSG','DXYN','DSGX','TCFC','CHEF','CAKE','CG','BONT','BKYF','TBBK','ANDE','ABCO','TGTX','TFSL','TXRH','TXN','TCBIW','TCBIP','TCBIL','TCBI','TTPH','TLOG','TTEK','TSRA','TESS','TSLA','TESO','TSRO','TBNK','TRTLW','TRTLU','TRTL'",
            "'TERP','TENX','TTEC','TNAV','TSYS','TKMR','TECU','TGEN','TGLS','TTGT','TCCO','TECD','TEAR','TCPC','TAYD','TATT','TASR','TRGT','TEDU','TANH','TNGO','TLF','TNDM','TLMR','TTWO','TAIT','TTOO','TROW','SYRX','SYPR','SYUT','SYMX','SYNT','SNTA','SNPS','ELOS','SGYPW','SGYPU','SGYP','SURG','SNDX','SNCR','SYNA','SYNL','GEVA','SYNC','SSRG','SYMC','SYKE','SWSH','SIVBO','SIVB','STRN','SUTR','SBBX','SUSQ','SRDX','SCAI','SPRT','SPPRP','SPPRO','SPPR','SUPN','SGC','SCON','SPCB','SMCI','SSH','SBCP','SPWR','STKL','GOMO','SNSS','SEMI','SNDE','SNHY','SNBC','SMMT','SSBI','SMMF','SUMR','SUBK','SCMP','STB','STRM','STRA','STRS','STRT','SSYS','SGBK','BANX','SYBT','STCK','SSFN','SHOO','STRL','SRCL','STXS','STML','STEM','STNR','SMRT','STLD','GASS','STDY','SNC','SIBC','STBZ','STFC','STRZB','STRZA','SBUX','SBLKL','SBLK','SPLS','STLY','STMP','STAA','SSNC','SQBK','SPSC','SFM','FUND','SPWH','SPOK','SPLK','SAVE','SPEX','ANY','SPDC','SPPI','SPTN','SPAR','ONCE','SPKE','SGRP','SBSA','SPAN','SP','OKSB','SBSI','SONA','SMBC','SFST','SOCB','SSB','SFBC','SOHOM','SOHOL','SOHO','SRNE','SORL','SPHS','SONS','SOFO','SONC','SZYM','SEDG','SCTY','SLTD','SUNS','SLRC','SOHU','SODA','LNCE','SMTP','SMTX','SMSI','SWHC','SPRO','SMT','SLMBP','SLMAP','SLM','OSM','JSM','ISM','SWKS','SKYW','SKBI','SPU','MOBI','SKYS','SKUL','SZMK','SRVA','SIRO','SIRI','SVA','SINO','SCOK','SMACU','SMACR','SMAC','SBGI','SINA','SLP','SFNC','SAMG','SSRI','SPIL','SIMO','SLAB','SGI','SILC','SLGN','SBNYW','SBNY','SGNL','SGMA','SIAL','SIGM','SIFY','SWIR','BSRR','SIEN','SIEB','SIFI','SFLY','SHOR','SHBI','SCVL','SHPG','SHLO','SHEN','SMED','GAME','SGOC','SFXE','SVBI','SEV','SFBS','SREV','SQBG','SQNM','SNMX','SENEB','SENEA','SMTC','SMLR','LEDS','SIGI','SLTC','SCSS','SLCT','SEIC','SNFCA','EYES','SGEN','SHOS','SHLDW','SHLD','SRSC','SHIP','STX','SBCF','SEAC','SCYX','SQI','SGMS','SCLN','SCHL','SCHN','SMIT','SCSC','SBAC','SBFGP','SBFG','SRPT','SPNS','GCVRZ','SANM','SGMO','SASR','SNDK','SAFM','SAL','SALM','SAJA','SAIA','SGNT','SAGE','SAFT','SAEX','SABR','SBRAP','SBRA','SXB','SANW','STBA','RYAAY','RXII','RUTH','RTGN','RUSHB','RUSHA','RBCN','RTIX','RRM','RPXC','ROYL','RGLD','RBPAA','ROVI','ROST','ROSE','ROSG','ROKA','ROIQW','ROIQU','ROIQ','RSTI','RMCF','RCKY','RMTI','FUEL','RCPI','ROBO','RMGN','RLJE','RVSB','RIVR','RITTW','RITT','RNET','NAME','RIGL','RELL','RIBTW','RIBT','RGCO','RFIL','REXX','RWLK','RVLT','RBIO','RVNC','RTRX','SALE','ROIC','RGDX','RECN','REXI','RESN','REFR','FRBK','RBCAA','RJET','RPRXZ','RPRXW','RPRX','RGEN','RENT','RTK','RCII','REGI','RNST','REMY','MARK','RLYP','RELV','REIS','RGLS','REGN','REDF','RDHL','RRGB','REPH','RCON','QYLD','UK','DAX','RCPT','RP','RNWK','RELY','RGSE','RDIB','RDI','RLOC','RCMT','RICK','ROLL','RAVN','RAVE','RPTP','GOLD','RLOG','RAND','RMBS','RDWR','RDNT','RDUS','RSYS','ROIAK','ROIA','RDCM','RADA','RRD','QTNTW'",
            "'QTNT','QUNR','QUMU','QNST','QPACW','QPACU','QPAC','QDEL','QUIK','QRHC','QTWW','QLYS','QBAK','QSII','QLTY','QCOM','QRVO','QLTI','QLGC','QLIK','QKLS','QIWI','QGEN','QCRH','QCCO','QADB','QADA','PCYO','PULB','PTCT','PTC','PMD','PSDV','PSBH','PBIP','PROV','PWX','PRTA','PRTO','PSEC','BIS','SQQQ','TQQQ','BIB','PRQR','PRPH','PFPT','PRGS','PGNX','PFIE','IPDN','PDEX','PKT','PVTBP','PVTB','PRIM','PRMW','PNRG','PBMD','PSMT','PRGX','LENS','PINC','PFBI','PRXI','PLPC','PFBC','PRAN','PRAH','PRAA','POZN','PSCU','PSCM','PSCT','PSCI','PSCH','PSCF','PSCE','PSCC','PSCD','QQQ','PNQI','LALT','LDRI','IPKW','PSAU','PAGG','PRFZ','PDBC','PSIX','POWI','POWL','PCH','PBPB','PSTR','PTLA','PBIB','BPOPN','BPOPM','BPOP','PLKI','POPE','POOL','PLCM','PBCP','PRMF','PCOM','PNTR','PBSK','PMFG','PMCS','PSTI','PLBC','PLUG','PLXS','PTBIW','PTBI','PLPM','PLNR','PXLW','PPSI','PNFP','PME','PPC','PICO','PLAB','PHMD','PAHC','PHIIK','PHII','PGTI','PFSW','PETS','PRSN','PERY','PTX','PESI','PERI','PSEM','PERF','PFMT','PRFT','PWRD','PPHMP','PPHM','PRCP','PBCT','PFIS','PFBX','PEBK','PEBO','PTXP','PWOD','PNNT','PFLT','PENN','PCO','PEGA','PGC','SKIS','PDLI','PDII','PDFS','PDCE','PCTI','PCMI','PCCC','PCTY','PAYX','PTEN','PDCO','PEGI','PATI','PNBK','PATK','PBHC','PTNR','PARN','PKOH','PRKR','PKBK','PSTB','PCYG','PRXL','PRTK','PRGNL','PRGN','FRSH','PZZA','PANL','PNRA','PAAS','PLMT','PTIE','PACW','PCRX','PSUN','PPBI','PMBC','PEIX','PDVW','PCBK','PACB','PCAR','PTSI','PFIN','OXGN','OXLCP','OXLCO','OXLCN','OXLC','OXFD','OXBRW','OXBR','OSTK','OVAS','OUTR','OTTR','OTIC','OTEL','OSN','OSIR','OSIS','OFIX','ORRF','ORIT','SEED','OREX','ORLY','ORBK','ORBC','OSUR','ORMP','OPB','OPHC','OCC','OBAS','OPHT','OPGNW','OPGN','OPXAW','OPXA','OTEX','ONVI','ONFC','OHGI','ONTY','ONCS','ONTX','OMED','ONCY','OGXI','OTIV','ON','OVTI','OMCL','OMER','OFLX','ZEUS','OSBCP','OSBC','OPOF','ONB','OLBK','ODFL','OHRP','OVBC','OHAI','OFS','ODP','OMEX','OCLSW','OCLS','OCUL','OFED','OCLR','OCRX','OCFC','OSHC','ORIG','OPTT','OBCI','OCAT','OVLY','OIIM','NYMX','NXTDW','NXTD','NXTM','NXPI','NVDA','NVEC','NVEE','QQQX','NUVA','NTRI','NUTR','NMRX','NUAN','NTLS','NVGN','NVAX','MIFI','NVDQ','NVMI','NVFY','NWFL','NCLH','NWPX','NWBOW','NWBO','NWBI','NRIM','NFBK','NTRSP','NTRS','NTIC','NECB','NBN','NTK','NSYS','NDSN','NDLS','NNBR','NMIH','NICK','NICE','EGOV','NFEC','NVET','NXST','NEWT','NEWS','NWSA','NWS','NEWP','NLNK','NBBC','NYMTP','NYMTO','NYMT','NSIG','NUROW','NURO','NDRM','NBIX','NTWK','NTCT','NLST','NTGR','NFLX','NTES','NTAP','NETE','UEPS','NEPT','NRX','NVCN','NEOT','NBS','NEON','NEO','NEOG','NKTR','NCIT','NBTB','NAVI','NVSL','BABY','NATR','NHTC','NAII','NWLI','NSEC','NRCIB','NRCIA','NPBC','NATL','NATI','NHLD','NGHCP','NGHCO','NGHC','NCOM','NCMI','FIZZ','NKSH','NAUH','NATH','NSSC','NSTG','NSPH','NANO','MYGN','MYRG','MYOS','MYL','MFSF','MVIR','MFLX'",
            "'LABL','MTSC','MSBF','MRVC','MDM','MPAA','MOSY','MORN','MHGC','MNST','MRCC','MNRO','TYPE','MPWR','MGI','MDLZ','MNRK','MCRI','MOMO','MNTA','MOLG','MOKO','MLNK','MDSY','MOCO','MOBL','MINI','MMAC','MKSI','MITL','MITK','MIND','MSON','MRTX','NERV','MNDO','MDXG','MOFG','MSEX','MBCN','MBRG','MCEP','MPB','MVIS','MSTR','MSFT','MSCC','MICTW','MICT','MU','MCHP','MCRL','MGPI','MGEE','MGCD','MFRI','METR','MEILZ','MEILW','MEIL','MEOH','MBLX','CASH','MLAB','MSLI','MERU','MACK','MMSI','VIVO','EBSB','MRGE','MRCY','MBVT','MERC','MBWM','MELI','MTSL','MENT','MRD','MEMP','MELR','MLNX','MPEL','MELA','MEIP','MEET','MDVXW','MDVX','MDWD','MDVN','MDGS','MDSO','MNOV','MTBC','MDAS','TAXI','MCOX','MDCA','MGRC','MCGC','MBFIP','MBFI','MZOR','MXWL','MXIM','MTSN','MFRM','MATW','MATR','MAT','MTRX','MTLS','MASI','MRVL','MMLP','MRTN','MBII','MAR','MRLN','MRKT','MKTO','MKTX','MRNS','MARPS','MCHX','MARA','MAPI','MANT','MNKD','MTEX','MNTX','LOAN','MANH','MAMS','MLVF','MBUU','MMYT','COOL','MSFG','MHLDO','MHLD','MGYR','MAG','MNGA','CALL','MGIC','MPET','MGLN','MAGS','MCBK','MGNX','MCUR','MFNC','MCBC','MTSI','MBTF','LUNA','LMOS','LMNX','LMNS','LULU','LYTS','LRAD','LPLA','LPTN','LOXO','LABC','LORL','LOOK','EVAR','LOJN','LOGM','LOGI','LOCM','LNBB','LMIA','LKQ','LPSN','LIVE','LFUS','LQDT','LIQD','LPCN','LIOX','LBIO','LINE','LNCO','LLTC','LECO','LINC','LMNR','LLNW','LIME','LLEX','LPTH','LTBR','LGND','LWAY','LFVN','LCUT','LPNT','LTRPB','LTRPA','TAX','LMCK','LMCB','LMCA','QVCB','QVCA','LVNTB','LVNTA','LBTYK','LBTYB','LBTYA','LBRDK','LBRDA','LHCG','LGIH','LXRX','TACOW','TACOU','TACO','TREE','LMAT','LTXB','LGCYP','LGCYO','LGCY','LTRE','LBIX','LDRH','LCNB','LAYN','LAWS','LSCC','LPSB','LTRX','LNTH','LSTR','LE','LMRK','LARK','LNDC','LANC','LAMR','LRCX','LACO','LAKE','LKFN','LBAI','LSBG','LSBK','LJPC','FSTR','KYTH','KVHI','KLIC','KUTV','KTOS','KWEB','KRFT','KOSS','KRNT','KOPN','KZ','KONA','KLXI','KLOX','KLAC','KITE','KIRK','KONE','KINS','KGJI','KNMD','KIN','KBAL','KE','KFRC','KTCC','KTEC','KEQU','GMCR','KERX','KFFB','KMPH','KELYB','KELYA','KRNY','KCAP','KBSF','KPTI','KCLI','KNDI','KMDA','KBIO','KALU','KTWO','JUNO','JNP','JOUT','JBSS','JOEZ','JIVE','JST','DATE','JCTCF','JTPY','JBLU','JDSU','JD','JAZZ','JASNW','JASN','ERW','JRVR','JMBA','JAKK','JAGX','JAXB','JXSB','JACK','JKHY','JASO','JCOM','JBHT','MAYS','JJSF','IXYS','XXIA','ITRN','ITRI','ISRL','ISLE','ISIS','IGOV','ISHG','INDY','WOOD','ICLN','EMIF','SOXX','IBB','UAE','QAT','IEUS','EUFN','EVAL','EEML','EGRW','EMEY','EEME','EMDI','EEMA','AAIT','AXJS','AAXJ','ACWI','ACWX','IFNA','IFGL','IFEU','IFAS','FCHI','GNMA','COMT','IRCP','IRWD','IRBT','IRDMB','IRDM','IRIX','IRMD','IPGP','IPCM','STPP','DLBL','DLBS','FLAT','DFVL','DFVS','DTUL','DTUS','DTYL','DTYS','IPAS','NVIV','ITIC','ISBC','ISTR','SNAK','INVT','ISRG','INTU','IIN','ITCI','INTLL','INTL','IVAC','IILG'",
            "'ISIL','INTX','XENT','INPH','PTNT','IIJI','IGLD','ISCA','IBOC','INAP','IMI','TILE','IDCC','ICLDW','ICLD','ICPT','ININ','IBKR','IPAR','IPCI','IQNT','INTC','ISSI','IESC','IDTI','IART','INSY','PODD','IIIN','INSM','ISIG','NSIT','INO','INOV','ITEK','INGN','ISSC','IOSP','IPHS','INOD','INNL','INWK','IMKTA','IFON','III','INFA','IPCC','INFI','INFN','IDSA','IBTX','IBCP','INDB','INCY','SAAS','INCR','IMMY','IPXL','IMMU','IMGN','IMNP','IMDZ','ICCC','IMMR','ISNS','ILMN','IKNX','IKAN','KANG','IIVI','RXDX','IRG','IGTE','IROQ','DSKY','IDXX','IDRA','INVE','IPWR','ICUI','ICON','ICLR','ICFI','IEP','ICAD','IBKC','IKGH','IACI','IDSY','HYGS','HDRAW','HDRAU','HDRAR','HDRA','HBP','HTCH','HURN','HURC','HBANP','HBAN','HDSN','HSON','HCBK','HUBG','HTGM','HSNI','HBMD','HOVNP','HWCC','HMHC','HDP','ZINC','HRZN','HZNP','HBNC','HFBC','HOFT','HKTV','HTBI','HMST','HMIN','AWAY','HFBL','HOMB','HBCP','HOLX','HOLI','HMSY','HMNF','HSGX','HIFS','HIMX','HIHO','HPJ','HIBB','HFFC','HSKA','HRTX','MLHR','HCCI','HEOP','HBOS','HFWA','HTBK','HERO','HSIC','HNNA','HMTV','HMNY','HELE','HSII','HTBX','HTWR','HTLF','HTLD','HWAY','HSTM','HQY','HCSG','HIIQ','HDS','HAYN','HWBK','HWKN','HCOM','HA','HAS','HCAPL','HCAP','HBIO','HART','TINY','HRMNW','HRMNU','HRMN','HLIT','HDNG','HQCL','HNSN','HAFC','HNH','HBHCL','HBHC','HMPR','HBK','HALO','HALL','HNRG','HEES','GYRO','GWGH','GWPH','GPOR','GURE','GIFI','GULTU','GUID','GFED','GBNK','GTXI','GSVC','GSIT','GSIG','GGAL','OMAB','GRPN','GRFS','GRIF','GLRE','GCBC','GPRE','GRBK','GNBC','GSBC','GLDD','GBSNU','GBSN','GRVY','LOPE','GPIAU','GMAN','GPRO','GOOGL','GOOG','GTIM','GBDC','GOGL','GLDC','GMLP','GLNG','GOGO','GLYC','GLUU','GLRI','GLBS','GBIM','GSM','GAI','YLCO','SRET','SOCL','QQQC','ACTX','GSOL','GBLI','ENT','GDEF','GLBZ','LAND','GAINP','GAINO','GAINN','GAIN','GOODP','GOODO','GOODN','GOOD','GLADO','GLAD','GBCI','GILD','GILT','GIII','GIGA','GIGM','ROCK','GEVO','GERN','GABC','GEOS','GTWN','GNVC','THRM','GNTX','GHDX','GNCA','GNMK','GENE','GFNSL','GFNCP','GFN','GNCMA','GENC','GLSS','GKNT','GCTS','GARS','GGACW','GGACU','GGACR','GGAC','GRMN','GPIC','GLPI','GLMD','GALE','GALTW','GALTU','GALT','GLPG','GAIA','WILC','GK','FXENP','FXEN','FFHL','FSNN','FULT','FLL','FULLL','FULL','FCEL','FTEK','FSYS','FTD','FSBW','FRPH','FTR','FRPT','FEIM','RAIL','FREE','FRED','FELE','FRAN','FOXF','FXCB','FMI','FOSL','FWP','FORD','FWRD','FBIO','FTNT','FORR','FORTY','FORM','FES','FONR','FOMX','FFIC','FLDM','FLIR','FLEX','FLXS','MBSD','SKOR','FLXN','FLKS','FLML','FIVN','FPRX','FIVE','FISV','FSV','FMER','SVVC','FUNC','TUSA','FDIV','FTSL','QINC','AIRR','QTEC','QQXT','QQEW','RDVY','CARZ','GRID','QCLN','FONE','QABA','FMB','LMBS','FTLB','PLTM','CU','SKYY','YDIV','FPXI','HYLS','FTHI','FTGC','MDIV','TDIV','FEUZ','FTSM','FEMB','IFV','FV','FTCS','BICK','FSBK','FSLR','FSGI','FSFG','FNWB','FNFG','FNBC','FMBI'",
            "'FMBH','FRME','FIBK','INBK','FFWM','FFNW','THFF','FFIN','FFBCW','FFBC','FFNM','FDEF','FBNK','FCCO','FCBC','FCLF','FCNCA','FCFS','FCAP','FCVA','FBIZ','BUSE','FRBA','FNLC','FBNC','FEYE','FNTCW','FNTCU','FNTC','FNJN','FNSR','FISI','FNGN','FITBI','FITB','FSFR','FSCFL','FSC','FSAM','FRGI','FDUS','LION','ONEQ','FGEN','FCSC','FENX','FHCO','FEIC','FNHC','FDML','FBRC','FBSS','FATE','FAST','FARO','FMNB','FFKT','FARM','DAVE','FALC','FWM','FRP','FCS','FB','FFIV','EZPW','EZCH','EXTR','EXLP','ESRX','EXPO','EXPD','EXPE','EXLS','EXFO','EXEL','EXAC','EXAS','EXA','EVOL','EVOK','EVLV','EVK','EVEP','ESEA','EEFT','CLWT','ETSY','ECAV','ESSX','ESND','ESSA','ESPR','ESMC','ESCRP','ESCR','ESCA','ERIE','ERIC','EAC','EQIX','PLUS','EPZM','EPRS','EPIQ','ENZY','ENZN','ENVI','EGT','EFSC','EBTC','ETRM','ENTL','ENTG','ENFC','ESGR','ENPH','ENG','ENOC','EXXI','ERII','EFOI','WATT','EIGI','STIM','ELGX','ECYT','ENDP','WIRE','ECPG','ENTA','ERS','NYNY','EMMSP','EMMS','EMKR','EMCF','EMCI','ELTK','LONG','ESBK','CAPX','RDEN','EBIO','ELSE','EFII','EA','ESIO','ELRC','ERI','ESLT','EMITF','LOCO','EHTH','EGLT','EGAN','EFUT','EDUC','EDGW','EDAP','ESES','EEI','SATS','ECTE','ECHO','ELON','EBIX','EBAY','EVBS','EML','EWBC','ELNK','EROC','EGRX','EGLE','EGBN','EBMT','ETFC','DVAX','DYNT','DYSL','BOOM','DYAX','DXPE','DRRX','DNKN','DTSI','CADTW','CADTU','CADTR','CADT','DSPG','DSKX','DRYS','DWA','DRWIW','DRWI','DOVR','HILL','DORM','DMLP','DGICB','DGICA','DLTR','DNBF','DLHC','BAGR','DVCR','DISH','DSCO','DISCK','DISCB','DISCA','DTV','DPRX','DIOD','DCOM','APPS','DGLY','DRAD','DMRC','DGII','DRNA','DCIX','FANG','DHIL','DMND','DXCM','DXM','DSWL','DXLG','DEST','DERM','DSCI','DEPO','XRAY','DENN','DELTW','DELT','DGAS','DCTH','DFRG','DHRM','TRAK','DBVT','DWSN','DTEA','PLAY','DWCH','DRAM','DTLK','DAIO','DARA','DAKT','DJCO','DAEG','CYTR','CTSO','CYTX','CYTK','CONE','CYRN','CY','CYNO','CBAY','CYCCP','CYCC','CYBE','CYBX','CYBR','CYAN','CVV','CVBF','CUTR','CRIS','CMLS','CPIX','CUI','CUNB','CTRP','CTIB','CTIC','CTCM','CSRE','CSPI','CCLP','CSGS','CRWN','CRWS','CRDS','CCRN','CROX','CRTO','CRESY','CREE','SLVO','GLDI','CACC','CRAY','BREW','CBRL','CRAI','CPSH','COWNL','COWN','COVS','CVTI','CRRC','ICBK','CPAH','COST','CSGP','COSI','CRVL','CSOD','CORI','CORE','BVA','CORT','CRBP','CPRT','CTRL','CTRV','CFRXZ','CFRXW','CFRX','CPSS','CTCT','CWCO','CNSL','CONN','CNXR','CNOB','CTWS','CNMD','CCUR','CNCE','CNAT','CNSI','CMTL','CHCI','SCOR','CTG','CPSI','CGEN','CFA','CFO','CSF','CDC','CIZ','CVLT','COB','CWBC','CTBI','CYHHZ','CCFI','ESXB','CBIN','JCS','CSAL','COMM','CVGI','CBSHP','CBSH','CMCSK','CMCSA','CBMX','CMCO','COLM','COLB','CLCD','CBAN','CIGI','COLL','CLCT','CLRX','COHU','CHRS','COHR','CTSH','CGNX','CGNT','CCOI','JVA','CVLY','CDXS','CDRB','COKE','COBZ','CWAY','CNV','CISG','CCNE','CME','CMFN','CLVS','CSBK','CKSW','CBLI','CLIR'",
            "'CLRO','CLFD','CLNT','CLNE','CDTI','CIVBP','CIVB','CHCO','CTXS','CIZN','CZFC','CZWI','CZNC','CTRN','CSCO','CRUS','CPHR','CTAS','CIDM','CINF','CMPR','CMCT','CIFC','CDTX','CHUY','CHDN','CHSCP','CHSCO','CHSCN','CHSCM','CHSCL','IMOS','CNET','CCIH','CNYD','CXDC','CNTF','CSUN','CPGI','CRDI','CREG','CHNR','CMGE','HTHT','CJJD','CNIT','CHLN','HGSH','CHOP','JRJC','CCCR','CCCL','CBPO','CBAK','CAAS','CALI','CADC','CMRX','PLCE','CBNK','CHEV','CHKE','CHMG','CCXI','CHFC','CEMI','CHEKW','CHEK','CHKP','CHFN','CHTR','GTLS','CTHR','HOTRW','HOTR','CYOU','CEVA','KOOL','CERS','CERU','CERN','CERE','CRNT','CPHD','CNTY','CNBKA','CENX','CVCY','CENTA','CENT','CFBK','CETV','CSFL','CEMP','CLTX','CLSN','CBMG','CLLS','CLRBW','CLRB','CLDX','CLDN','CELGZ','CELG','CPXX','CECE','CDW','CDK','CBOE','CNLMW','CNLMU','CNLMR','CNLM','CBFV','CAVM','CVCO','CATYW','CATY','CTRX','CPRX','CASS','CASI','CASY','CWST','CSCD','CACB','CASM','CARV','CRTN','TAST','CRZO','CART','CARO','CLBH','CKEC','CTRE','CECO','CDNA','CATM','CSII','CRME','CFNL','CRDC','CBYL','CARB','CARA','CPST','CAPR','CAPNW','CAPN','CFFN','CLACW','CLACU','CLAC','CPTA','CSWC','CPLP','CCBG','CBF','CPLA','CBNJ','CPHC','CGIX','CSIQ','CAMT','CAC','CAMBW','CAMBU','CAMB','ABCD','CLMT','CALM','CALD','CALA','CFNB','CVGW','CAMP','CSQ','CGO','CHW','CFGE','CCD','CHI','CHY','CLMS','PRSS','CSTE','CZR','CACQ','CDZI','CDNS','CCMP','CA','CHRW','CFFI','BUR','BLDR','BWLD','BSQR','BLMT','BMTC','BRKR','BRKS','BRKL','BRCD','BWEN','BYFC','BVSN','BSFT','BRCM','BCOV','BRID','BLIN','BBNK','BDGE','BBEPP','BBEP','BBRG','BCLI','BLVDW','BLVDU','BLVD','BDBD','EPAY','BPFHW','BPFHP','BPFH','BRDR','BAMM','BNSO','BONA','BOKF','BOJA','WIFI','BOFI','BOBE','BNCN','BPMC','CBDE','BKEPP','BKEP','BLUE','NILE','BHBK','BBLU','BLBD','BCOR','BLMN','ADRU','ADRE','ADRD','ADRA','BKCC','HAWK','BBRY','BLKB','BDE','BBOX','BJRI','BDMS','BEAT','TECH','BOTA','BSPM','BSTC','BBP','BBC','BIOS','BRLI','BPTH','BVXVW','BVXV','BMRN','BLRX','BLFS','BIOL','BIIB','BDSI','BIOD','BCRX','BIOC','BASI','ORPN','BIND','BGFV','BGCP','BGMD','BNFT','BNCL','BLCM','BLPH','BELFB','BELFA','BBBY','BEBE','BBGI','BSF','BECN','BDCV','BCBP','BBCN','BV','BYLK','BYBK','BSET','BBSI','BHACW','BHACU','BHACR','BHAC','TAPR','BZUN','BANR','BWFG','BFIN','OZRK','BOTJ','BKSC','BMRC','BOCH','BKMU','BANFP','BANF','BLDP','BWINB','BWINA','BCPC','BIDU','BEAV','BOSC','BCOM','AXTI','AXGN','AXPWW','AXPW','ACLS','AWRE','CAR','AVGR','AVID','AVNW','AVEO','AVNU','AAVL','AVGO'",
            "'ADP','AGMX','ADSK','ABTL','ADAT','EARS','AUPH','AUDC','ADNC','AUBN','LIFE','ATTU','ATRM','ATRI','ATRC','ATOS','ATML','AFH','AAWW','ATLC','ATNI','ACFC','AAME','AAPC','ATHX','AFCB','ATHN','ATRA','ATAI','ASUR','ASTC','ATRO','ALOT','ASTE','ASFI','ASMB','AZPN','ASML','ASMI','APWC','ASTI','ASCMA','ASND','ASNA','ASBB','PUMP','ARTW','ARTNA','ARWR','AROW','DWAT','ARRS','ARRY','ARQL','ARWAW','ARWAU','ARWAR','ARWA','ARTX','ARMH','ARKR','ARIA','ARIS','ARGS','AGIIL','AGII','ARCC','ARNA','ARDX','ACAT','ACGL','ARCB','RKDA','ABIO','ARCW','ARBR','PETX','ARDM','AUMAW','AUMAU','AUMA','AQXP','APTO','APRI','AREX','AAOI','AMCC','AMAT','AGTC','APDNW','APDN','ARCI','AAPL','AMEH','AINV','APOL','APOG','APIC','ATNY','ABAC','ANTH','ANTE','ATRS','ANSS','ANIK','ANIP','ANGO','ANGI','AMCF','ABCW','ANCB','ALOG','ADI','ANAD','ANAC','AMRS','AFSI','ASYS','AMSGP','AMSG','AMPH','AMKR','FOLD','AMGN','ATLO','ASRVP','ASRV','AMSF','ABCB','CRMT','AMWD','AMSC','AMSWA','ASEI','AMRB','ARCPP','ARCP','ARII','APEI','ANAT','AMNB','AMIC','AETI','ANCI','ACAS','ACSF','MTGEP','MTGE','AGNCP','AGNCB','AGNC','AAL','AMOV','ATAX','ASBI','UHAL','AMED','AMDA','DOX','AMCX','EPAX','AMBA','AMBCW','AMBC','AMZN','AYA','AMRK','AMRN','AMAG','AIMC','ASPS','ALTR','ATEC','SMCP','AOSL','ALNY','AFAM','MDRX','ALLT','ALQA','AMOT','AHPI','ARLP','AHGP','AIQ','AFOP','ALLB','ALGT','ALKS','ALIM','ALGN','ALCO','ALXA','ALXN','ALDX','ALDR','ADHD','ABDC','AMRI','ALSK','AKRX','AKER','AKBA','AKAM','AIXG','AMCN','ATSG','AIRT','AIRM','AGIO','AGYS','AGRX','AGEN','AFFX','AFMD','AEZS','AVAV','AERI','AEPI','AMTX','AEHR','AEGN','AEGR','YPRO','MULT','ADVS','ADXSW','ADXS','AMD','AEIS','AAAP','ADRO','ADTN','ADBE','ADMA','ADEP','AEY','ADUS','ADAP','ADMP','ADMS','ACXM','ACUR','ACTA','ATVI','ACPW','ACTS','ACFN','ACOR','ACNB','ACIW','ACHN','AKAO','ACET','ACRX','VXUP','VXDN','ARAY','ANCX','XLRN','AXDX','ACST','ACAD','ACHC','ACTG','AXAS','ABMD','ABGB','ABY','ABAX','AAON','SHLM','AVHI','EGHT','SIXD','JOBS','DGLD','TWOU','VNET','SRCE','FCCY','FCTY','FLWS','PIH','TFSCW','TFSCU','TFSCR','TFSC'"
    ];
    $scope.alerts = [];
    
    $scope.addAlert = function(type, msg) {
        $scope.alerts.push({ type: type, msg: msg});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    
    $scope.formattedJumpName = function () {
        return $filter('uppercase')($scope.scroll_id);
    };
    
    $scope.get_query_string_final_nas1 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[0] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas2 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[1] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas3 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[2] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas4 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[3] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas5 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[4] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas6 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[5] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas7 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[6] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    $scope.get_query_string_final_nas8 = function () {
        return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + $scope.nasdaq[7] + ")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    };
    
    console.log($scope.get_query_string_final_nas1());
    console.log($scope.get_query_string_final_nas2());
    console.log($scope.get_query_string_final_nas3());
    console.log($scope.get_query_string_final_nas4());
    console.log($scope.get_query_string_final_nas5());
    console.log($scope.get_query_string_final_nas6());
    console.log($scope.get_query_string_final_nas7());
    console.log($scope.get_query_string_final_nas8());
    
    $scope.goToLocation = function(id) { 
        if($scope.loaded) {
            if (!document.getElementById(id)) {
                var msg = '';
                if($scope.scroll_id === '') {
                    msg = 'Please enter a stock symbol'
                    $scope.addAlert('danger', msg); 
                }
                else {
                    msg = 'Symbol "' + $scope.scroll_id + '" could not be found. Please make sure the symbol you entered is correct'
                    $scope.addAlert('danger', msg); 
                }
            }
            else {
                var oldHash = $location.hash();
                var oldColor = String(document.getElementById(id).style.backgroundColor);
                $location.hash(id);
                $anchorScroll();
                $location.hash(oldHash);
                if(id !== 'top') {
                    document.getElementById(id).style.backgroundColor = 'rgb(185,222,145)';

                    $timeout(function () {
                        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
                    }, 500);

                    $timeout(function () {
                        document.getElementById(id).style.backgroundColor = 'rgb(185,222,145)';
                    }, 1000);

                    $timeout(function () {
                        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
                    }, 1500);

                    $timeout(function () {
                        document.getElementById(id).style.backgroundColor = 'rgb(185,222,145)';
                    }, 2000);

                    $timeout(function () {
                        document.getElementById(id).style.backgroundColor = 'rgb(255,255,255)';
                    }, 2500);
                    $timeout(function () {
                        document.getElementById(id).style.backgroundColor = oldColor;
                    }, 3000);
                }
            }
        }
        else {
            $scope.addAlert('danger', 'Please Load Data First!');
        }
    };
    
    $scope.query_with_symbl = function (symbl) {    
        $location.path(symbl);
    };
    
    $scope.query = function () {
        $location.path('/query/aapl');
    };
    
    $scope.repaint = function (canvas, brush) {
        document.getElementById(canvas).innerHTML = brush;
    };
    
    $scope.reset_data = function () {
        $scope.btnName = "Refresh";
        $scope.responseJSON_nas1 = [];
        $scope.responseJSON_nas2 = [];
        $scope.responseJSON_nas3 = [];
        $scope.responseJSON_nas4 = [];
        $scope.responseJSON_nas5 = [];
        $scope.responseJSON_nas6 = [];
        $scope.responseJSON_nas7 = [];
        $scope.responseJSON_nas8 = [];
        $scope.out = '';
        $scope.out_comp = '';
        $scope.status_nasdaq = [];
        $scope.dynamic = 0;
        $scope.repaint('resultslist', $scope.out);
    };
    
    $scope.printSubTable = function (i, responseJSON) {
        
        var name = '';
        var symbl = '';
        var path = '';
        
        for (let i = 0; i < responseJSON.length; i++) {
            name = String(responseJSON[i].Name);
            symbl = responseJSON[i].Symbol;
            path = '/query/' + symbl;
            
            if (name === "null") {
                name = "- No Name On Record -";
            }
            $scope.trueChange = String(responseJSON[i].Change);
            if ($scope.trueChange.charAt(0) === '+') {
                $scope.trueChange = String(responseJSON[i].Change).substr(1);
            }
            if (parseFloat($scope.trueChange) > 1.0) { $scope.counter++;
                $scope.out += '<tr id="' + symbl + '" ng-click="query_with_symbl(\'' + path + '\')" class="goodCO"><td>' + name + " (" + responseJSON[i].Symbol + ")</td><td>" + responseJSON[i].EarningsShare + "</td><td>" + responseJSON[i].BookValue + "</td><td>" + responseJSON[i].Change +  "</td></tr>";
                }                                           
            else { 
                $scope.counter++;
                $scope.out += '<tr id="' + symbl + '" ng-click="query_with_symbl(\'' + path + '\')"><td>' + name + " (" + responseJSON[i].Symbol + ")</td><td>" + responseJSON[i].EarningsShare + "</td><td>" + responseJSON[i].BookValue + "</td><td>" + responseJSON[i].Change +  "</td></tr>";
            }   
        }
        console.log(responseJSON.length);
    };
    
    $scope.printTable = function () {
        console.log('printing table');
         
        var eventName = '', eventDate = '', i, j, k, l, m, n, o, p, output;
        $scope.trueChange = '';
        $scope.counter = 0;
        
        $scope.out = "<table class='table table-bordered table-hover'><tr><td><strong>Name</strong></td><td><strong>Earnings Per Share</strong></td><td><strong>Book Value</strong></td><td><strong>Change</strong></td></tr>"; 
        
        $scope.printSubTable(i, $scope.responseJSON_nas1.query.results.quote);
        $scope.printSubTable(j, $scope.responseJSON_nas2.query.results.quote);
        $scope.printSubTable(k, $scope.responseJSON_nas3.query.results.quote);
        $scope.printSubTable(l, $scope.responseJSON_nas4.query.results.quote);
        $scope.printSubTable(m, $scope.responseJSON_nas5.query.results.quote);
        $scope.printSubTable(n, $scope.responseJSON_nas6.query.results.quote);
        $scope.printSubTable(o, $scope.responseJSON_nas7.query.results.quote);
        $scope.printSubTable(p, $scope.responseJSON_nas8.query.results.quote);
            
        console.log($scope.counter);
        $scope.out += "</table> <br>";
        output = $compile($scope.out)($scope);
        angular.element(document.getElementById('resultslist')).append(output);
    };
    
    $scope.refresh_data = function () {
        
        $scope.reset_data();
        $scope.loading = 8;
        $scope.loaded = true;
        document.getElementById('progressbar_main').style.visibility = 'visible';
        
        $http.get($scope.get_query_string_final_nas1())
            .success(function (responseText_nas1, status) {
                $scope.responseJSON_nas1 = responseText_nas1;
                console.log('Nasdaq_1: ' + status);
                $scope.status_nasdaq[0] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas2())
            .success(function (responseText_nas2, status) {
                $scope.responseJSON_nas2 = responseText_nas2;
                console.log('Nasdaq_2: ' + status);
                $scope.status_nasdaq[1] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas3())
            .success(function (responseText_nas3, status) {
                $scope.responseJSON_nas3 = responseText_nas3;
                console.log('Nasdaq_3: ' + status);
                $scope.status_nasdaq[2] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas4())
            .success(function (responseText_nas4, status) {
                $scope.responseJSON_nas4 = responseText_nas4;
                console.log('Nasdaq_4: ' + status);
                $scope.status_nasdaq[3] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas5())
            .success(function (responseText_nas5, status) {
                $scope.responseJSON_nas5 = responseText_nas5;
                console.log('Nasdaq_5: ' + status);
                $scope.status_nasdaq[4] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas6())
            .success(function (responseText_nas6, status) {
                $scope.responseJSON_nas6 = responseText_nas6;
                console.log('Nasdaq_6: ' + status);
                $scope.status_nasdaq[5] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas7())
            .success(function (responseText_nas7, status) {
                $scope.responseJSON_nas7 = responseText_nas7;
                console.log('Nasdaq_7: ' + status);
                $scope.status_nasdaq[6] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
        $http.get($scope.get_query_string_final_nas8())
            .success(function (responseText_nas8, status) {
                $scope.responseJSON_nas8 = responseText_nas8;
                console.log('Nasdaq_8: ' + status);
                $scope.status_nasdaq[7] = status;
                $scope.loading--;
                $scope.dynamic++;
                if (String($scope.status_nasdaq[0]) === '200' && String($scope.status_nasdaq[1]) === '200' && String($scope.status_nasdaq[2]) === '200' && String($scope.status_nasdaq[3]) === '200' && String($scope.status_nasdaq[4]) === '200' && String($scope.status_nasdaq[5]) === '200' && String($scope.status_nasdaq[6]) === '200' && String($scope.status_nasdaq[7]) === '200') {
                    $scope.printTable();
                }
            })
            .error(function (data, status) {
                console.log(data);
                console.log(status);
            });
    };
}]);
