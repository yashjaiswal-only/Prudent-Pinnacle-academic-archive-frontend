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
  'Authored',
  'Edited'
];
export const projectStatusOptions = ['Ongoing', 'Completed'];
export const patentGrantedOptions = ['Yes', 'No'];
export const studentProjectStatusOptions = ['Ongoing', 'Submitted', 'Awarded'];
export const btpProjectType = ['Major', 'Minor'];
export const classesType = ['BE, B.Tech.']
export const categoryType = ['Category 1','Category 2']

export const excellenceFields = [
  '1. Course Updated or Curriculum designed',
  '2. (i) Participation in Interactive Courses',
  '2. (ii) Participation in Learning Modules',
  '2. (iii) Participation in case studies',
  '3. Use of ICT in T-L process with computer-aided methods like power-point/Multimedia/ Simulation/Software etc.',
  '4. Developing and imparting Remedial/Bridge Courses activites',
  '5. Developing and imparting soft skills/ communications skills/personality development courses/modules',
  '6. Developing and imparting specialized teaching-learning programmes in Physical education, library; innovative compositions and creations in music, performing and visual arts and other traditional area',
  '7. Organizing and conduction of popularization programmes/training courses in computer assisted teaching/web-based learning and e-library skills to students',
  '8. University end semester/Annual Examination work as per duties, allotted. (invigilation – 10 points, Evaluation of answer scripts – 5 points; Question paper setting - 5 points) (100% compliance = 20 points)',
  '9. University examination/Evaluation responsibilities for internal/ continuous assessment work as allotted ( 100% compliance = 10 points)',
  '10. Examination work such as coordination, or flying squad duties etc. (maximum of 5 or 10 depending upon intensity of duty) (100% compliance = 10 points)',
  '1. (i) Instructional Co-curricular activities for students such as field studies / educational tours, industry –imparting training and placement activity (5 point each)',
  '1. (ii) Positions held / Leadership role played in organization linked with Extension Work and National Service Scheme (NSS), NCC or any other similar activity (each activity 10 points)',
  '1. (iii) Student and staff related Socio-Cultural and sports programs, campus publications (Students (departmental level 2 points, institutional level 5 points)',
  '1. (iv) Community work such as values of National Integration, Environment democracy, socialism, Human Rights, peace, scientific temper; flood or, drought relief, small family norms etc. (5 points)',
  '2. (i) Contribution to Corporate life in Universities/colleges through meetings, popular lectures, subject related events, articles in college magazine and University volumes ( 2 point each)',
  '2. (ii) Institutional Governance responsibilities like, Vice-Principal, Dean, Director, Warden, Bursa, School Chairperson, IQAC Coordinator (10 points each)',
  '2. (iii) Participation in committees concerned with any aspect of departmental or institutional management such as admission committee, campus development, library committee ( 5 points each)',
  '2. (iv) Responsibility for, or participation in committees for Students Welfare, Counseling and Discipline ( 5 points each) ',
  '2. (v) Organization of Conference / Training as Chairman/Organizational Secretary/Treasurer: (a) International (10 points) National/regional (5 points)As member of the organizing committee (1 point each)',
  '3. (i) Membership in profession related committees at state and national level a) At national level : 3 points each b) At site activity : 2 points each',
  '3. (ii) Participation in subject associations, conferences, seminars without paper presentation ( each activity : 2 points)',
  '3. (iii) Participation in short term training courses less than one week duration in educational technology, curriculum development, professional development, Examination reforms, Institutional governance (each activity: 5 points)',
  '3. (iv) Membership/participation in State/Central Bodies/Committees on Education, Research and National Development ( 5 points each)',
  '3. (v) Publication of articles in newspapers, magazines or other publications ( not covered in category 3); radio talks; television programs ( 1 point each)'
];

export const category3 = {
  heading: 'RESEARCH, PUBLICATIONS AND ACADEMIC CONTRIBUTIONS',
  name: 'CATEGORY III',
  table: [
    {
      name: '(A) (i) Published Papers in Journals (Can attach sheet)',
      fields: [
        'S.N.',
        'Title',
        'Journal with Vol. Year & Page No.',
        'ISSN/ISBN No.',
        'Whether peer reviewed. Impact factor, if any',
        'No. of Co-authors',
        'Whether you are the main author or Guide/mentor',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      values: "a1"
    },
    {
      name: 'A(ii) Full papers in Conference Proceedings',
      fields: [
        'S.N.',
        'Title',
        'Details of conference Proceedings (With Year, Page No.)',
        'National / International',
        'No. of Co-authors and',
        'Whether you are the main author',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd', 'e', 'f'],
      values: "a2"
    },
    {
      name: 'B (i) Books published as single author or as editor',
      fields: [
        'S.N.',
        'Title with page no.',
        'Type of Book & Authorship',
        'Publisher & ISSN/ ISBN No.',
        'Whether Peer Reviewed',
        'No. of Co-author & Date of Publication',
        'Whether Published by National/ International',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      values: "b1"
    },
    {
      name: 'B (ii) Articles/ Chapters published in Books (other than referred journals / conference proceedings)',
      fields: [
        'S.N.',
        'Title with page no.',
        'Book Title, editor & publisher',
        'ISSN/ ISBN No.',
        'Whether Peer Reviewed',
        'No. of Co-author & Date of Publication',
        'Whether Published by National/ International',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      values: "b2"
    },
    {
      name: 'C (i & ii). Ongoing Research Projects / Consultancies',
      fields: [
        'S.N.',
        'Title',
        'Agency',
        'Period',
        'Grant/ Amount Mobilized (Rs Lakhs)',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd', 'e'],
      values: "c12"
    },
    {
      name: 'C (iii & iv) Completed Projects / Consultancies',
      fields: [
        'S.N.',
        'Title',
        'Agency',
        'Period',
        'Grant/ Amount Mobilized (Rs Lakhs)',
        'Whether Policy Documents/Patent as outcome',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd', 'e', 'f'],
      values: "c34"
    },
    {
      name: '(D) Research Guidance',
      fields: [
        'Particulars.',
        'Number Enrolled',
        'Thesis Submitted',
        'Degree Awarded',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd'],
      values: "d"
    },
    {
      name: 'E(i) Training Courses, Teaching-Learning-Evaluation Technology Programs, Faculty development Programmes (not less than one week duration) (Max.30 Points)',
      fields: [
        'S.N.',
        'Programme',
        'Duration',
        'Organised by',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd'],
      values: "e1"
    },
    {
      name: 'E (ii) Papers presented in Conferences, Seminars, Workshops, Symposia',
      fields: [
        'S.N.',
        'Title of the paper presented',
        'Title of Conference/Semi nar etc',
        'Date(s ) of the event',
        'Organised by',
        'Whether International/ National/State/Region al/University or College Level',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd'],
      values: "e2"
    },
    {
      name: 'E(iii) Invited Lectures and Chairmanships at National or International Conference/ Seminars',
      fields: [
        'S.N.',
        'Title of Lecture/ Academic Session',
        'Title of Conference/ Seminar etc',
        'Organised by',
        'Whether International/ National/State',
        'API Score'
      ],
      prop: ['a', 'b', 'c', 'd'],
      values: "e3"
    }
  ]
}

export const category1 = {
  table1: {
    fields: ['Sr No.', 'Particulars', 'Max Score Per Year', 'API score obtained '],
    rows: [
      {
        text: ['1', 'Lectures, seminars, tutorials, practical, contact classes should be based on verifiable records. On basis of Lectures undertaken as percentage of lectures allocated.',
          '50',],
        value: 'r1'
      },
      {
        text: ['2', 'Lectures or other teaching duties in excess of the AICTE norms for which no remuneration is charged.',
          '10',],
        value: 'r2'
      },
      {
        text: ['3', 'Preparation and Imparting of knowledge / instruction as per curriculum; syllabus enrichment by providing additional resources to students',
          '20',],
        value: 'r3'
      },
      {
        text: ['4', 'Use of participatory and innovative teaching-learning methodologies; updating of subject content, course improvement etc.',
          '20',],
        value: 'r4'
      },
      {
        text: ['5', 'Examination duties (invigilation, question paper setting, evaluation, / assessment of answer scripts) as per allotment.',
          '25',],
        value: 'r5'
      },
      // {
      //   text: ['', 'Total Score Obtained',
      //     '125',],
      //   value: '115'
      // },
      // {
      //   text: ['Minimum API score required per year 75']
      // }
    ]
  },

  table2: {
    fields: {
      a: 'Sr. No',
      b: 'Academic Year',
      c: 'Class',
      d: 'Course / Paper / Subject Taught',
      e: 'Mode of Teaching*',
      f: 'Semester I, III and V',
      g: 'Semester II, IV and VI',
      h: 'Teaching Hours per week',
      i: 'As per AICTE norms',
      j: 'Allotted Effective Hours of teaching per week',
      k: '% of Classes taken as per documented record(Maximum 50 points)',
      l: 'Teaching Hours in Excess of AICTE norms for which no additional remuneration charged (Maximum 10 points)'
    },
    prop: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
  },

  table3: {
    fields: [
      'Sr. No.',
      'Class',
      'Course/Paper',
      'Consulted',
      'Prescribed',
      'Additional Resource provided'
    ],
    prop: ['a', 'b', 'c', 'd', 'e']
  },

  table4: {
    fields: ['Sr No.', 'Particulars', 'Max Score', 'API score obtained '],
    rows: [
      {
        text: ['1', 'Updating of Courses, design of curriculum, (5 per single course)',
          '10',],
        value: 'r1'
      },
      {
        text: ['2', 'Participatory & Innovative T-L Process with material for problem-based learning, case studies, Group discussions etc. a)	Interactive Courses:  5 points/each b)	Participatory Learning modules: 5 points/eachc)	Case studies: 5 points/each',
          '10',],
        value: 'r2'
      },
      {
        text: ['3', 'Use of ICT in T-L process with computer-aided methods like power-point/Multimedia/ Simulation/Software etc., (Use of any one of these in addition to Chalk & Board: 5 points)',
          '10',],
        value: 'r3'
      },
      {
        text: ['4', 'Developing and imparting Remedial/Bridge Courses (each activity: 5 points)',
          '10',],
        value: 'r4'
      },
      {
        text: ['5', 'Developing and imparting soft skills/ communications skills/personality development courses/modules (each activity 5 points)',
          '10',],
        value: 'r5'
      },
      {
        text: ['6', 'Developing and imparting specialized teaching-learning programmes in Physical education, library; innovative compositions and creations in music, performing and visual arts and other traditional areas (each activity: 5 points)',
          '10',],
        value: 'r6'
      },
      {
        text: ['7', 'Organizing and conduction of popularization programmes/training courses in computer assisted teaching/web-based learning and e-library skills to studentsa)	Workshop/Training course : 10  points eachb)	Popularization programmes:  5 points each',
          '10',],
        value: 'r7'
      },
    ]
  },

  table5: {
    fields: ['Sr No.', 'Particulars', 'Maximum Score per Year', 'API score obtained '],
    rows: [
      {
        text: ['1', 'University end semester/Annual Examination work as per duties, allotted. (invigilation – 10 points, Evaluation of answer scripts – 5 points; Question paper setting - 5 points) (100% compliance  = 20 points)',
          '20',],
        value: 'r1'
      },
      {
        text: ['2', 'University examination/Evaluation responsibilities for internal/ continuous assessment work as allotted ( 100% compliance = 10 points)',
          '10',],
        value: 'r2'
      },
      {
        text: ['3', 'Examination work such as coordination, or flying squad duties etc. (maximum of 5 or 10 depending upon intensity of duty) (100% compliance = 10 points)',
          '10',],
        value: 'r3'
      },
      // {
      //   text: ['', 'Total Score (Max. Score per Year 25)',
      //     '25',],
      //   value: 'r4'
      // }
    ]
  },

}

export const category2 ={
    rows1: [
      {
        text: ['Instructional Co-curricular activities for students such as field studies / educational tours, industry –imparting training and placement activity (5 point each)', '10'],
        value: 'r1'
      },
      {
        text: ['Positions held / Leadership role played in organization linked with Extension Work and National Service Scheme (NSS), NCC or any other similar activity (each activity 10 points)','10'],
        value: 'r2'
      },
      {
        text: ['Student and staff related Socio-Cultural and sports programs, campus publications (Students (departmental level 2 points, institutional level 5 points)', '10'],
        value: 'r3'
      },
      {
        text: ['Community work such as values of National Integration, Environment democracy, socialism, Human Rights, peace, scientific temper; flood or, drought relief, small family norms etc. (5 points)','10',],
        value: 'r4'
      },
      // {
      //   text: ['Total (Max. aggregate limit: 20)','20'],
      //   value: 'r5'
      // }
    ],
    rows2:[
      {
        text:['Contribution to Corporate life in Universities/colleges through meetings, popular lectures, subject related events, articles in college magazine and University volumes ( 2 point each)','10'],
        value:'r1'
      },
      {
        text:['Institutional Governance responsibilities like, Vice-Principal, Dean, Director, Warden, Bursa, School Chairperson, IQAC Coordinator (10 points each)','10'],
        value:'r2'
      },
      {
        text:['Participation in committees concerned with any aspect of departmental or institutional management such as admission committee, campus development, library committee ( 5 points each)','10'],
        value:'r3'
      },
      {
        text:['Responsibility for, or participation in committees for Students Welfare, Counseling and Discipline  ( 5 points each)','10'],
        value:'r4'
      },
      {
        text:['Organization of Conference / Training as Chairman/Organizational Secretary/Treasurer: (a)	International (10 points) National/regional (5 points)As member of the organizing committee (1 point each)','10'],
        value:'r5'
      },
      // {
      //   text:['Total (Max aggregate limit: 15)','15'],
      //   value:'r6'
      // },
    ],
    rows3:[
      {
        text:['Membership in profession related committees at state and national level a) At national level   :    3 points each b) At site activity      :    2 points each ','10'],
        value:'r1'
      },
      {
        text:['Participation in subject associations, conferences, seminars without paper presentation   ( each activity : 2 points)','10'],
        value:'r2'
      },
      {
        text:['Participation in short term training courses less than one week duration in educational technology, curriculum development, professional development, Examination reforms, Institutional governance (each activity: 5 points)','10'],
        value:'r3'
      },
      {
        text:['Membership/participation in State/Central Bodies/Committees on Education, Research and National Development ( 5 points each)','10'],
        value:'r4'
      },
      {
        text:['Publication of articles in newspapers, magazines or other publications ( not covered in category 3); radio talks; television programs ( 1 point each)','10'],
        value:'r5'
      },
      // {
      //   text:['Total (Max aggregate limit: 15)','15'],
      //   value:'r6'
      // },
    ]
}