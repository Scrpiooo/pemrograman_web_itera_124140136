def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)

    config.add_route('home', '/')

    # GET semua mahasiswa
    config.add_route(
        'mahasiswa_list', '/api/mahasiswa',
        request_method='GET'
    )

    # POST tambah mahasiswa
    config.add_route(
        'mahasiswa_add', '/api/mahasiswa',
        request_method='POST'
    )

    # GET detail mahasiswa
    config.add_route(
        'mahasiswa_detail', '/api/mahasiswa/{id}',
        request_method='GET'
    )

    # PUT ubah mahasiswa
    config.add_route(
        'mahasiswa_update', '/api/mahasiswa/{id}',
        request_method='PUT'
    )

    # DELETE mahasiswa
    config.add_route(
        'mahasiswa_delete', '/api/mahasiswa/{id}',
        request_method='DELETE'
    )

    # GET semua matakuliah
    config.add_route(
        'matakuliah_list', '/api/matakuliah',
        request_method='GET'
    )

    # POST tambah matakuliah
    config.add_route(
        'matakuliah_add', '/api/matakuliah',
        request_method='POST'
    )

    # GET detail matakuliah
    config.add_route(
        'matakuliah_detail', '/api/matakuliah/{id}',
        request_method='GET'
    )

    # PUT ubah matakuliah
    config.add_route(
        'matakuliah_update', '/api/matakuliah/{id}',
        request_method='PUT'
    )

    # DELETE matakuliah
    config.add_route(
        'matakuliah_delete', '/api/matakuliah/{id}',
        request_method='DELETE'
    )