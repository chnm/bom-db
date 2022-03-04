<template>
    <vue-good-table
        :is-loading.sync="isLoading"
        :columns="parishColumns"
        :rows="filteredData"
        max-height="600px"
        :sort-options="{
        enabled: true,
        initialSortBy: {field: 'name', type: 'asc'}}"
        :fixed-header="true"
        :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 25,
        position: 'top',
        perPageDropdown: [25, 50, 100],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        rowsPerPageLabel: 'Rows per page',
        allLabel: 'All records'
        }"
        style-class="vgt-table condensed striped"/>
</template>

<script>
export default {
    name: 'ParishDataTable',
    props: {
        parishNames: {
            type: Array,
            required: true
        },
        filteredYears: {
            type: Array,
            required: true
        },
        filteredParishNames: {
            type: Array,
            required: true
        },
        filteredCountType: {
            type: String,
            default: 'All',
            required: true
        }
    },
    data() {
        return {
            isLoading: true,
            parishColumns: [
                {
                label: 'Parish',
                field: 'name',
                filterOptions: {
                    enabled: true,
                    placeholder: "Search for parish name"
                }
                },
                {
                label: 'Count Type',
                field: 'count_type',
                },
                {
                label: 'Count',
                field: 'count',
                type: 'number',
                },
                {
                label: 'Week Number',
                field: 'week_no',
                type: 'number'
                },
                {
                label: 'Year',
                field: 'year',
                type: 'date',
                dateInputFormat: 'yyyy',
                dateOutputFormat: 'yyyy',
                },
            ],
        }
    },
    computed: {
        filteredData() {
        // The following returns the dataset based on choices made by the user. 
        // 1. If no filters are chosen by parish name, count type, or year range, all the data is returned. 
        // 2. If only parish names are selected, the data is filtered by the chosen parish names.
        // 3. If only the year range is selected, the data is filtered by the chosen year range.
        // 4. If a count type is selected, the data is filtered by the chosen count type. 'All' returns all
        //    the data. 'Buried' or 'Plague' returns the data filtered by the chosen count type.
        // We then return an array of the filtered data from this.totalParishes.
        const filteredParishNames = this.filteredParishNames;
        const filteredYears = this.filteredYears;
        const filteredCountType = this.filteredCountType;

        const dataFilteredByCountType = this.totalParishes.filter(parish => {
            if (filteredCountType === 'All') {
            return parish;
            } else if (filteredCountType === 'Buried') {
            return parish.count_type === 'Buried';
            } else if (filteredCountType === 'Plague') {
            return parish.count_type === 'Plague';
            }
            return parish;
        });
        
        const result = dataFilteredByCountType.filter(row => {
            if (filteredParishNames.length === 0 && filteredYears === [1640, 1790] && filteredCountType === 'All') {
            return this.totalParishes;        
            } else if (filteredParishNames.length > 0 && filteredCountType === 'All') {
            return row.year >= filteredYears[0] && row.year <= filteredYears[1] && filteredParishNames.includes(row.name);
            } else if (filteredParishNames.length > 0) {
            return row.year >= filteredYears[0] && row.year <= filteredYears[1] && filteredParishNames.includes(row.name);
            } else {
            return row.year >= filteredYears[0] && row.year <= filteredYears[1];
            }
        });

        return result;

        },
        // This function filters the data based on the countType chosen by the user from totalParishes. 
        // The three options are 'All', 'Burial,' or 'Plague'. If the user chooses 'All', the data is returned. 
        // If the user chooses 'Burial', the data is filtered by the 'Burial' count. If the user chooses
        // 'Plague', the data is filtered by the 'Plague' count type.
        uniqueParishes() {
        // The following returns an array of unique parish names from the dataset.
        return this.totalParishes.reduce((seed, current) => {
            return Object.assign(seed, {
            [current.name]: current
            });
        }, {});
        },
    }
    }
</script>
