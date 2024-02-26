export const departmentNames = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Electrical',
    'Mechanical',
  ];

 export const nationalityOptions = [
    'International',
    'National'
  ];
 export const refTypeOptions = [
    'Refered',
    'Non-Refered'
  ];
 export const bookTypeOptions = [
    'a',
    'b'
  ];
export const projectStatusOptions=['Ongoing','Completed'];
export const patentGrantedOptions=['Yes','No'];
export const studentProjectStatusOptions=['Ongoing','Submitted','Awarded'];
export const btpProjectType=['Major','Minor'];

export const category3={
  heading:'RESEARCH, PUBLICATIONS AND ACADEMIC CONTRIBUTIONS',
  name:'CATEGORY III',
  table:[
    {
      name:'(A) (i) Published Papers in Journals (Can attach sheet)',
      fields:[
        'S.N.',
        'Title',
        'Journal with Vol. Year & Page No.',
        'ISSN/ISBN No.',
        'Whether peer reviewed. Impact factor, if any',
        'No. of Co-authors',
        'Whether you are the main author or Guide/mentor',
        'API Score' 
      ],
      prop:['a','b','c','d','e','f','g'],
      values:"a1"
    },
    {
      name:'A(ii) Full papers in Conference Proceedings',
      fields:[
        'S.N.',
        'Title',
        'Details of conference Proceedings (With Year, Page No.)',	
        'National / International',
        'No. of Co-authors and',
        'Whether you are the main author',	
        'API Score' 
      ],
      prop:['a','b','c','d','e','f'],
      values:"a2"
    },
    {
      name:'B (i) Books published as single author or as editor',
      fields:[
        'S.N.',
        'Title with page no.',
        'Type of Book & Authorship',	
        'Publisher & ISSN/ ISBN No.',
        'Whether Peer Reviewed',
        'No. of Co-author & Date of Publication',	
        'Whether Published by National/ International',
        'API Score' 
      ],
      prop:['a','b','c','d','e','f','g'],
      values:"b1"
    },
    {
      name:'B (ii) Articles/ Chapters published in Books (other than referred journals / conference proceedings)',
      fields:[
        'S.N.',
        'Title with page no.',
        'Book Title, editor & publisher',	
        'ISSN/ ISBN No.',
        'Whether Peer Reviewed',
        'No. of Co-author & Date of Publication',	
        'Whether Published by National/ International',
        'API Score' 
      ],
      prop:['a','b','c','d','e','f','g'],
      values:"b2"
    },
    {
      name:'C (i & ii). Ongoing Research Projects / Consultancies',
      fields:[
        'S.N.',
        'Title',
        'Agency',
        'Period',
        'Grant/ Amount Mobilized (Rs Lakhs)',
        'API Score' 
      ],
      prop:['a','b','c','d','e'],
      values:"c12"
    },
    {
      name:'C (iii & iv) Completed Projects / Consultancies',
      fields:[
        'S.N.',
        'Title',
        'Agency',
        'Period',
        'Grant/ Amount Mobilized (Rs Lakhs)',
        'Whether Policy Documents/Patent as outcome',
        'API Score' 
      ],
      prop:['a','b','c','d','e','f'],
      values:"c34"
    },
    {
      name:'(D) Research Guidance',
      fields:[
        'Particulars.',
        'Number Enrolled',
        'Thesis Submitted',
        'Degree Awarded',
        'API Score' 
      ],
      prop:['a','b','c','d'],
      values:"d"
    },
    {
      name:'E(i) Training Courses, Teaching-Learning-Evaluation Technology Programs, Faculty development Programmes (not less than one week duration) (Max.30 Points)',
      fields:[
        'S.N.',
        'Programme',
        'Duration',
        'Organised by',
        'API Score' 
      ],
      prop:['a','b','c','d'],
      values:"e1"
    },
    {
      name:'E (ii) Papers presented in Conferences, Seminars, Workshops, Symposia',
      fields:[
        'S.N.',
        'Title of the paper presented',
        'Title of Conference/Semi nar etc',
        'Date(s ) of the event',
        'Organised by',
        'Whether International/ National/State/Region al/University or College Level',
        'API Score' 
      ],
      prop:['a','b','c','d'],
      values:"e2"
    },
    {
      name:'E(iii) Invited Lectures and Chairmanships at National or International Conference/ Seminars',
      fields:[
        'S.N.',
        'Title of Lecture/ Academic Session',
        'Title of Conference/ Seminar etc',
        'Organised by',
        'Whether International/ National/State',
        'API Score' 
      ],
      prop:['a','b','c','d'],
      values:"e3"
    }
  ]
}