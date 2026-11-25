
from pyramid.view import view_config
from pyramid.response import Response
from pyramid_mahasiswa.models import Matakuliah


@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    dbsession = request.dbsession
    data = dbsession.query(Matakuliah).all()

    return {
        'matakuliah': [mk.to_dict() for mk in data]
    }


@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if mk is None:
        request.response.status = 404
        return {'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}

    return mk.to_dict()


@view_config(route_name='matakuliah_add', renderer='json')
def matakuliah_add(request):
    data = request.json_body

    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']

    for field in required_fields:
        if field not in data or data[field] in (None, ''):
            request.response.status = 400
            return {'error': f'Field {field} wajib diisi!'}

    dbsession = request.dbsession

    mk = Matakuliah(
        kode_mk=data['kode_mk'],
        nama_mk=data['nama_mk'],
        sks=data['sks'],
        semester=data['semester']
    )

    dbsession.add(mk)
    dbsession.flush()

    return {
        'message': 'Matakuliah berhasil ditambahkan!',
        'matakuliah': mk.to_dict()
    }


@view_config(route_name='matakuliah_update', renderer='json')
def matakuliah_update(request):
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if mk is None:
        request.response.status = 404
        return {'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}

    data = request.json_body

    for field in ['kode_mk', 'nama_mk', 'sks', 'semester']:
        if field in data:
            setattr(mk, field, data[field])

    return {
        'message': 'Matakuliah berhasil diperbarui!',
        'matakuliah': mk.to_dict()
    }


@view_config(route_name='matakuliah_delete', renderer='json')
def matakuliah_delete(request):
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()

    if mk is None:
        request.response.status = 404
        return {'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}

    dbsession.delete(mk)

    return {
        'message': 'Matakuliah berhasil dihapus!'
    }
