describe('Loading and Submitting Log Entries', () => {
	it('Read-only entries are displayed on a read-only page', async () => {

	});

	[
		{ mode: 'read-only', isReadOnly: true },
		{ mode: 'read-write', isReadOnly: false }
	].forEach(t => {
		it(`Weight can be rendered in lbs in ${ t.mode } mode`, async () => {

		});

		it(`Depth can be rendered in ft in ${ t.mode } mode`, async () => {

		});

		it.skip(`Temperature can be rendered in °F in ${ t.mode }`, async () => {
			// TODO: Add some fields to record temperature so we can test this.
		});
	});

	it('Weight can be submitted in lbs', async () => {

	});

	it('Depth can be submitted in ft', async () => {

	});

	it.skip('Temperature can be submitted in °F', async () => {
		// TODO: Add some fields to record temperature so we can test this.
	});

	it('Page redirects to Not Found page if entry is not found', async () => {

	});

	it('Page redirects to Forbidden page if user does not have permission to view the entry', async () => {

	});

	it('Anonymous users are redirected to login page if user tries to create a new entry', async () => {

	});

	it('Anonymous users are redirected to login page if user tries to view a protected log entry', async () => {

	});

	it('Page redirects to Forbidden if user tries to update an entry they have no access to', async () => {

	});

	it('Page redirects to Not Found page if user tries to update a record that does not exist', async () => {

	});

	it('Page shows error message if there is a server error', async () => {

	});
});
